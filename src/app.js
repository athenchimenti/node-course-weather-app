const path = require(`path`);
const express = require(`express`);
const hbs = require(`hbs`);
const geocode = require(`./utils/geocode`);
const forecast = require(`./utils/forecast`);

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, `../public`);
const viewsPath = path.join(__dirname, `../templates/views`);
const partialsPath = path.join(__dirname, `../templates/partials`);

// Setup handlebars engine and views location
app.set(`view engine`, `hbs`);
app.set(`views`, viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get(``, (req, res) => {
  res.render(`index`, {
    title: `Weather`,
    name: `Athen`,
  });
});

app.get(`/about`, (req, res) => {
  res.render(`about`, {
    title: `About Me`,
    name: `Athen`,
  });
});

app.get(`/help`, (req, res) => {
  res.render(`help`, {
    title: `Help`,
    name: `Athen`,
    message: `This is the help section`,
  });
});

app.get(`/weather`, (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get(`/help/*`, (req, res) => {
  res.render(`404`, {
    title: `404`,
    name: `Athen`,
    desc: `Article`,
  });
});

app.get(`*`, (req, res) => {
  res.render(`404`, {
    title: `404`,
    name: `Athen`,
    desc: `Page`,
  });
});

app.listen(port, () => {});
