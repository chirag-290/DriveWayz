const mapservice = require('../services/maps.service');
const {validationResult} = require('express-validator');


module.exports.getAddressCoordinates = async (req, res, next) => {
    console.log('getAddressCoordinates');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const address = req.query.address;
    if (!address) {
        return res.status(400).json({
            message: 'Address is required'
        });
    }

    try {
        const coordinates = await mapservice.getAddressCoordinate(address);
        return res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return res.status(404).json({
            message: 'coordinate not found'
        });
    }
}


module.exports.getDistanceTime = async (req, res, next) => {

    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const origin = req.query.origin;
        const destination = req.query.destination;

       

        if (!origin || !destination) {
            return res.status(400).json({
                message: 'Origin and destination are required'
            });
        }
        const origin1=await mapservice.getAddressCoordinate(origin);
        const destination2=await mapservice.getAddressCoordinate(destination);

        console.log("origin1 is",origin1);
        console.log("origin2",destination2);

        const distanceTime = await mapservice.getDistanceTime(origin1, destination2);
        return res.status(200).json(distanceTime);

    }
    catch (error) {
        console.error('Error fetching distance and time:');
        return res.status(404).json({
            message: 'distance and time not found'
        });
    }

}


module.exports.getautocompleteSuggestion = async (req,res,next) =>{

    try{
        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors:errors.array()}); 
        }

        const {input}=req.query;

        const sugg=await mapservice.getAutocompletesuggestion(input);

        res.status(200).json(sugg);
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({
            message:'Internal server eroor'
        })
    }




}