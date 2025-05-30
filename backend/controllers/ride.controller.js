const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapservice = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");
const { sendEmail } = require("../services/mailService");
const userModel = require("../models/user.model");
const mailService = require("../services/mailService");


module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { pickup, destination, vehicleType } = req.body;
  console.log("in createRide", pickup, destination, vehicleType);
  //  pickup=await mapservice.getAddressCoordinate(pickup);
  //  destination=await mapservice.getAddressCoordinate(destination);

  console.log("in creat ride", req.user._id, pickup, destination, vehicleType);

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json(ride);
    const pi = await mapservice.getAddressCoordinate(pickup);

    console.log("in create ride", pi);

    const captaininradius = await mapservice.getCaptainsInTheRadius(
      pi.latitude,
      pi.longitude,
      10
    );

    ride.otp = null;

    const ridewithuser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    captaininradius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: ridewithuser,
      });
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getFare = async (req, res) => {
  console.log("in getfare");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;
  console.log("in getfare", pickup, destination);
  const pickup1 = await mapservice.getAddressCoordinate(pickup);
  const destination1 = await mapservice.getAddressCoordinate(destination);
  console.log("in getfare", pickup1, destination1);

  try {
    const fare = await rideService.getfare(pickup1, destination1);
    return res.status(200).json(fare);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide({
      rideId,
      captain: req.captain,
    });
    console.log("in confirm ride", ride);

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;

  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.captain,
    });

    console.log(ride);

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// module.exports.endRide = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { rideId } = req.body;

//     try {
//         const ride = await rideService.endRide({ rideId, captain: req.captain });

//         sendMessageToSocketId(ride.user.socketId, {
//             event: 'ride-ended',
//             data: ride
//         })

//         return res.status(200).json(ride);
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// }

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        // End the ride using ride service
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        // Send socket notification to user
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });

        // Get full user data (needed for email)
        const userData = await userModel.findById(ride.user._id);

        // Send completion email to user
        await mailService.sendRideCompletionEmailToUser(userData, ride);

        // Send completion email to captain
        await mailService.sendRideCompletionEmailToCaptain(req.captain, ride);

        return res.status(200).json(ride);
    } catch (err) {
        console.error("Error ending ride:", err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.getRidesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const rides = await rideModel
      .find({ user: userId })
      .populate("user", "fullname email")
      .populate("captain", "fullname") // optional: populate captain info
      .sort({ createdAt: -1 }); // latest first, if timestamps are enabled

    res.status(200).json({
      success: true,
      count: rides.length,
      rides,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};
module.exports.getRidesByCaptain = async (req, res) => {
  try {
    const { captainId } = req.params;

    const rides = await rideModel
      .find({ captain: captainId })
      .populate("user", "fullname") // optional: populate user info
      .sort({ createdAt: -1 }); // latest first, if timestamps are enabled

    res.status(200).json({
      success: true,
      count: rides.length,
      rides,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};
