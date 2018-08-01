const request = require('request');

const MAPSAPIKEY = 'AIzaSyBkTnyCOJVNP6nQwhJbXBUuL_bRiykvPLo';
var geocodeAddress = (address_passed) => {
    return new Promise( (resolve,reject) =>{
        var address_passed_encode = encodeURIComponent(address_passed);
        request({
            url : 'https://maps.googleapis.com/maps/api/geocode/json?address='+address_passed_encode+'&key='+MAPSAPIKEY,
            json : true
        },(error,response,body)=>{
            if(error){
                reject('Unable to connect to server');
            }else if(body.status === 'ZERO_RESULTS'){
                reject('Unable to find that address');
            }else if(body.status === 'OK'){
                let address_resp = {
                    address : response.body.results[0].formatted_address,
                    latitude : response.body.results[0].geometry.location.lat,
                    longitude : response.body.results[0].geometry.location.lng
                }
                resolve(address_resp);
                //callback(undefined,);
            }
        })
    });
    
}
module.exports = {
    geocodeAddress
};