const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapservice=require("../services/maps.service");
const {sendMessageToSocketId}=require("../socket");
const rideModel = require('../models/ride.model');


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
        const pi=await mapservice.getAddressCoordinate(pickup);

        console.log("in create ride",pi);
       

        const captaininradius=await mapservice.getCaptainsInTheRadius(pi.latitude,pi.longitude,10);

        ride.otp=null;

        const ridewithuser=await rideModel.findOne({_id:ride._id}).populate("user");

        captaininradius.map(captain=>{
            sendMessageToSocketId(captain.socketId,{
                event:"new-ride",
                data:ridewithuser
            });
        });

    } catch (err) {

        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.getFare = async (req, res) => {
    console.log("in getfare")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;
    console.log("in getfare",pickup,destination);
    const pickup1=await mapservice.getAddressCoordinate(pickup);
    const destination1=await mapservice.getAddressCoordinate(destination);
    console.log("in getfare",pickup1,destination1);

    try {
        const fare = await rideService.getfare(pickup1, destination1);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } s
}