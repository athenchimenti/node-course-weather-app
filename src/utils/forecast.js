const request = require(`request`);

const forecast = (lat, long, callback) => {
  const url =
    `http://api.weatherstack.com/current?access_key=85a60c7859854bfedbfad9e1eec2532e&query=` +
    long +
    `,` +
    lat +
    `&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to location services!`, undefined);
    } else if (body.error) {
      callback(`Unable to find location!`, undefined);
    } else {
      const temp = body.current.temperature;
      const feelsLike = body.current.feelslike;
      const windSpeed = body.current.wind_speed;
      const desc = body.current.weather_descriptions[0].toLowerCase();
      const print = `Currently ${temp} degrees out. It feels like ${feelsLike} and ${desc}. With wind at ${windSpeed} km/h.`;
      callback(undefined, print);
    }
  });
};

module.exports = forecast;
