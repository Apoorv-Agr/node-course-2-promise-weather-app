const request = require('request');
const WEATHER_API_KEY = '30f37ec8ff52e868f85e18ba573eb3f9';
// var latitude = 25.3674525;
// var longitude = 83.025396;
// https://api.darksky.net/forecast/30f37ec8ff52e868f85e18ba573eb3f9/25.3674525,83.025396
var getWeather = (lat_long_obj) =>{
    return new Promise( (resolve,reject) => {
        request({
            url : `https://api.darksky.net/forecast/${WEATHER_API_KEY}/${lat_long_obj.latitude},${lat_long_obj.longitude}`,
            json : true
        },(error,response,body) =>{
            if(!error && response.statusCode === 200){
                let tep_resp = {
                    temperature : body.currently.temperature,
                    apparentTemperature : body.currently.apparentTemperature,
                    summary : body.currently.summary,
                    dailySummary : body.daily.summary
                };
                resolve(tep_resp);
                // callback(undefined,{
                //     temperature : body.currently.temperature,
                //     apparentTemperature : body.currently.apparentTemperature
                // });
                //console.log(`Weather API Resp : ${JSON.stringify(body.currently.temperature,undefined,1)}`);
            }else{
                reject('Unable to fetch weather.');
                // callback('Unable to fetch weather.');
                //console.log('Unable to fetch weather.');
            }        
        });
    });
};
module.exports = {
    getWeather
}
