import BaseError from './BaseError.js';

class GenericError extends BaseError{
  constructor(message, status = 400){
    super(message, status);
  }
}

export default GenericError;