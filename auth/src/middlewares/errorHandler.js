import mongoose from 'mongoose';
import BaseError from './errors/BaseError.js';
import ValidationError from './errors/ValidationError.js';
import InvalidRequestError from './errors/InvalidRequestError.js';
import InternalNotFoundError from './errors/InternalNotFoundError.js';


// eslint-disable-next-line no-unused-vars
function handleError(error, req, res, next){
  if(error instanceof mongoose.Error.CastError){
    new InvalidRequestError().sendResponse(res);
  }else if(error instanceof mongoose.Error.ValidationError){
    new ValidationError(error).sendResponse(res);
  }else if(error instanceof InternalNotFoundError){
    new InternalNotFoundError().sendResponse(res);
  }else if(error instanceof InvalidRequestError){
    new InvalidRequestError().sendResponse(res);
  }else{
    new BaseError().sendResponse(res);
  }
}

export default handleError;