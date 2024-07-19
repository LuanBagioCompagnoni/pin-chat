import BaseError from './BaseError.js';

class InvalidRequestError extends BaseError{
  constructor(){
    super('One or more data provided is incorrect', 400);
  }
}

export default InvalidRequestError;