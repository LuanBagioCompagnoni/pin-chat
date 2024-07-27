import BaseError from './BaseError.js';

class DuplicityError extends BaseError{
  constructor(){
    super(`Document already exists!`, 409);
  }
}

export default DuplicityError;