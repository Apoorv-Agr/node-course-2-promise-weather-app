const request = require('request');

const MAPSAPIKEY = 'AIzaSyBkTnyCOJVNP6nQwhJbXBUuL_bRiykvPLo';
var geoCodeAddress = (address) => {
    return new Promise( (resolve,reject) => {
        var address_passed_encode = encodeURIComponent(address);
        request({
            url : 'https://maps.googleapis.com/maps/api/geocode/json?address='+address_passed_encode+'&key='+MAPSAPIKEY,
            json : true
        },(error,response,body)=>{
            if(error){
                reject('Unable to connect to server');
            }else if(body.status === 'ZERO_RESULTS'){
                reject('Unable to find that address');
            }else if(body.status === 'OK'){
                let locationObj = {
                    address : response.body.results[0].formatted_address,
                    latitude : response.body.results[0].geometry.location.lat,
                    longitude : response.body.results[0].geometry.location.lng
                }
                resolve(locationObj);
            }
        });
    });
};

geoCodeAddress(560048).then( (location)=>{
    console.log(JSON.stringify(location, undefined, 2));
}).catch( (errorMessage) => {
    console.log(errorMessage);
});