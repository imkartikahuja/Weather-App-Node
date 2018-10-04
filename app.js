const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch Weather for',
      string: true
    }
  })
  .help()
  .alias('help','h')
  .argv;

  geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage){
      console.log(errorMessage);
    } else {
      console.log(results.address);
      weather.getWeather(results.latitude,results.lonitude, (errorMessage,weatherResults) => {
        if (errorMessage){
          console.log(errorMessage);
        } else {
          console.log(`Current Temperature is ${weatherResults.temperature}°C. It feels like ${weatherResults.apparentTemperature}°C.`);
        }
      });
    }
  });
