const express=require('express');
const router=express.Router();
const authmiddleware=require('../middlwares/auth.middleware');
const mapscontroller=require('../controllers/map.controller');
const {query}=require('express-validator');

router.get('/get-coordinates',
query('address').notEmpty().withMessage('Address is required'),
    authmiddleware.authuser,mapscontroller.getAddressCoordinates);


router.get('/get-distance-time',
    query('origin').isString().notEmpty().isLength({min:3}),
    query('destination').isString().notEmpty().isLength({min:3}),
    authmiddleware.authuser,mapscontroller.getDistanceTime
)

router.get('/get-suggestions',
    query('input').isString().isLength({min:3}),
    authmiddleware.authuser,mapscontroller.getautocompleteSuggestion
)






module.exports=router;