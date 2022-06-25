const express = require("express");
const { json } = require("express");
const flights = require("./flights.json");
const routes = require("./routes/flightRoute");
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded());

app.get('/', function (req, res) {
  res.send('hello world')
  
})

app.post('/', function (req, res) {
  res.send('post request')
  
});


// Get All Flights


app.get('/flights', (req, res) => {
  // fetch all flights
  // send the flight array as response to the client.

  return res.json({ flights })
});

// Add or Book all Flights. 

app.post('/flights', (req, res) => {
  console.log(req.body.newFlight)
  
  // add new flight
  // save new flight to existing flights.
  flights.push(req.body.newFlight)
  console.log({flights})
  // stringify json data
  let stringedData = JSON.stringify(flights, null, 2);
  fs.writeFile('flights.json', stringedData, function(err)  {
    if (err){
      return res.status(500).json({message : err})
    }
  })
  //re-write the file flights.json 
  //send back response to client.
  return res.status(200).json({message : "new flight created"})

});



// Get a single Flight


app.get('/flights/:id', (req, res) => {

  // fetch req params.id
  let id = req.params.id;
  // find flight with id
  let foundFlight = flights.find(flight => {
    return String(flight.id) === id
  })
  if (foundFlight) {

    return res.status(200).json({flight: foundFlight})

  }else {

    return res.status(404).json({message: "flight doesn't exist!"})

  }
  // return flight object as response
  // returns a 404 ERROR if flight is not found.
});



app.use(json());

app.use("/", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
