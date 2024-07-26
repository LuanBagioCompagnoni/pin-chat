import BaseError from './BaseError.js';

class DuplicityError extends BaseError{
  constructor(document = "Document"){
    super(`${document} already exists!`, 409);
  }
}

export default DuplicityError;