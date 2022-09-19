const express = require("express");
const { json } = require("express");
const routes = require("./routes/flightRoute");
const app = express();

app.use(json());

app.use(express.json());

app.use(express.urlencoded());

app.get('/', function (req, res) {
  res.send('hello world')

});

app.use("/api/flights", routes);

const port = process.env.PORT || 3000;

const start = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

start();