
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
.options({
    a : {
        demand : true,
        alias : "Address",
        describe : "Address to fetch weather",
        string : true
    }
})
.help()
.alias('help','h')
.argv;

var address_passed = argv.a;
if(typeof address_passed === undefined || address_passed == ''){
    console.log("Please pass Address");
    return false;
}
// geocode.geocodeAddress(address_passed , (error,response)=>{
//     if(error){
//         console.log(error);
//     }else{
//         console.log(response.address);
//         weather.getWeather(response, (errorMessage,weatherResult)=>{
//             if(errorMessage){
//                 console.log(errorMessage);
//             }else{
//                 console.log(`Temperature is : ${weatherResult.temperature}. It feels like ${weatherResult.apparentTemperature}`);
//             }
//         });
//     }
// });

geocode.geocodeAddress(address_passed).then( (response)=>{
    console.log(response.address);
    return weather.getWeather(response);
}).then( (weatherResult)=>{
    weatherResult.temperature = ((weatherResult.temperature - 32) / 1.8).toFixed(2);
    weatherResult.apparentTemperature = ((weatherResult.apparentTemperature - 32) / 1.8).toFixed(2);
    // var currentDate = new Date(weatherResult.time).toDateString();
    console.log(`Weekly Weather Status : ${weatherResult.dailySummary}`);
    console.log(`Current Weather Status : ${weatherResult.summary}`);
    console.log(`Current Temperature is : ${weatherResult.temperature}. It feels like ${weatherResult.apparentTemperature}`);
}).catch( (errorMessage) => {
    console.log(errorMessage);
})

//var address_passed_decoded = decodeURIComponent(address_passed_encode);
//console.log(`Address Passed after decodeURIComponent: ${address_passed_decoded}`);