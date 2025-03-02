const ridemodel=require("../models/ride.model");
const mapservice=require("./maps.service");
const crypto = require('crypto');


async function getfare(pickup,destinaton)
{
    if (!pickup || !destinaton) {
        throw new Error('Pickup and destination are required');
    }

    console.log("in getfare",pickup,destinaton);

    const distanceTime = await mapservice.getDistanceTime(pickup, destinaton);

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;
}


function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {

    console.log("in createride in service",user,pickup,destination,vehicleType);
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required in this');
    }
    const pickup1=await mapservice.getAddressCoordinate(pickup);
    const destination1=await mapservice.getAddressCoordinate(destination);

    const fare = await getfare(pickup1, destination1);



    const ride = ridemodel.create({
        user,
        pickup,
        destination,
         otp: getOtp(6),
        fare: fare[ vehicleType ]
    })

    return ride;
}



module.exports.getfare=getfare;
