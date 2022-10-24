const fs = require("fs")
let flights = JSON.parse(fs.readFileSync("./models/flights.json", "utf-8"))

const writeFlight = () => {
    fs.writeFile(
        "./models/flights.json",
        JSON.stringify(flights),
        (err, result) => {
          if (err) {
            console.log(err)
            return
          }
          console.log('changes made to the json file successfully!') 
        }
    )
} 
const addFlight = (req, res) => {
    const flight ={}
    const {title, time, price, date} = req.body
    if(title && time && price && date){
        flight.title = title;
        flight.time = time;
        flight.price = price;
        flight.date = date;
        if(flights.length) flight.id = flights[flights.length-1]["id"]+1
        else flight.id = 0
    }
    else{
        return res.status(400).json({ status: "error", msg: "Insufficient data"})
    }
    flights.push(flight)
    writeFlight();
    res.status(201).json({status: "success" ,addedFlight : flight})
}

const getAllFlights = (req, res) => {
        res.status(200).json({flights})
}

const getOneFlight = (req, res) => {
    const singleFlight = flights.find(element => element.id == req.params.id)
    if(!singleFlight){
        return res.status(400).json({msg: `no Flight with id : ${req.params.id}`})
    }
    res.status(200).json({singleFlight})
}

const updateFlight = (req, res) => {
    const updateFlight = flights.find(element => element.id == req.params.id)
    if(!updateFlight){
        return res.status(400).json({msg: `no Flight with id : ${req.params.id}`})
    }
    const {title, time, price, date} = req.body
    if(title){
        updateFlight.title = title;
    }
    if(time){
        updateFlight.time = time;
    }
    if(price){
        updateFlight.price = price;
    }
    if(date){
        updateFlight.date = date;
    }
    flights = flights.map(element => {
        if(element.id == updateFlight.id){
            element = updateFlight
        }
        return element
    })
    writeFlight();
    res.status(201).json({status: "success", updatedFlight: updateFlight})
}

const deleteFlight =  (req, res) => {
    const deleteFlight = flights.find(element => element.id == req.params.id)
    if(!deleteFlight){
        return res.status(400).json({msg: `no Flight with id : ${req.params.id}`})
    }
    flights.splice(flights.indexOf(deleteFlight), 1)
    writeFlight();
    res.status(201).json({status: "success" ,deletedFlight: deleteFlight})
}

module.exports = {
    addFlight,
    getAllFlights,
    getOneFlight,
    updateFlight,
    deleteFlight
}


