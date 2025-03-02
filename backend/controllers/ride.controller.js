const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapservice=require("../services/maps.service")


module.exports.createRide =async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let {pickup, destination, vehicleType } = req.body;
    console.log("in createRide",pickup,destination,vehicleType);
    //  pickup=await mapservice.getAddressCoordinate(pickup);
    //  destination=await mapservice.getAddressCoordinate(destination);

    console.log("in creat ride",req.user._id,pickup,destination,vehicleType);

    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

    } catch (err) {

        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }


}