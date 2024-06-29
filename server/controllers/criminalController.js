const Criminal = require('../models/criminal');
const StatusCodes = require('http-status-codes');
const SuccessResponse = require('../utils/common/successResponse');
const ErrorResponse = require('../utils/common/errorResponse');

async function createCriminal(req,res){
    try{
        const {name, age, nationality, gender, objectKey } = req.body;

        const criminal = await Criminal.create({name, age, nationality, gender, objectKey});

        SuccessResponse.message = "Successfully inserted the criminal";
        SuccessResponse.data = criminal;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getCriminalByObjKey(req,res){
    try{

        console.log(req.query);
        const {objectKey } = req.query;

        const criminal = await Criminal.findOne({objectKey});

        if(!criminal){
            ErrorResponse.error = "No criminal found with that object key";
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }

        SuccessResponse.message = "Successfully fetched the criminal";
        SuccessResponse.data = criminal;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getCriminalById(req,res){
    try{
        const { id } = req.params.id;

        const criminal = await Criminal.findById(id);

        if(!criminal){
            ErrorResponse.error = "No criminal found with that id";
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }

        SuccessResponse.message = "Successfully fetched the criminal";
        SuccessResponse.data = criminal;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}


module.exports = {
    createCriminal,
    getCriminalByObjKey,
    getCriminalById
}