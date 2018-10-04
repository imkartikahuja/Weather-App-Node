const request = require('request');

var geocodeAddress = (address, callback) => {
  let encodedUserAddress = encodeURIComponent(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUserAddress}`,
    json: true
    },(error,response,body) => {
    if(error){
      callback('Unable to connect to Google Servers');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        lonitude: body.results[0].geometry.location.lng
      });
    } else if (body.status === 'OVER_QUERY_LIMIT') {
      callback('Query limit Reached. Please Retry.');
    }
  });
};

module.exports = {
  geocodeAddress
};
