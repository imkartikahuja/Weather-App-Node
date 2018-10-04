// 0cce1cbe1cf3be340cd3cdfe980306b6

const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/0cce1cbe1cf3be340cd3cdfe980306b6/${lat},${lng}?units=si`,
    json:true
  }, (error, response, body) => {
     if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch Weather.');
    }
  });
};

module.exports.getWeather = getWeather;
