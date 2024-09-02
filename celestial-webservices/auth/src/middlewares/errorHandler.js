import mongoose from 'mongoose';
import BaseError from './errors/BaseError.js';
import ValidationError from './errors/ValidationError.js';
import InvalidRequestError from './errors/InvalidRequestError.js';
import InternalNotFoundError from './errors/InternalNotFoundError.js';
import DuplicityError from './errors/DuplicityError.js';
import NoChangeError from './errors/NoChangeError.js';
import TokenError from "./errors/TokenError.js";

function handleError(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new InvalidRequestError().sendResponse(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).sendResponse(res);
  } else if (error instanceof InternalNotFoundError) {
    error.sendResponse(res);
  } else if (error instanceof InvalidRequestError) {
    error.sendResponse(res);
  } else if (error instanceof NoChangeError) {
    error.sendResponse(res);
  } else if (error instanceof DuplicityError) {
    error.sendResponse(res);
  } else if (error instanceof TokenError) {
    error.sendResponse(res);
  } else {
    new BaseError().sendResponse(res);
  }
}

export default handleError;
