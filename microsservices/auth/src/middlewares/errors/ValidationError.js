import BaseError from './BaseError.js';

class ValidationError extends BaseError{
  constructor(error){
    const validationErrors = Object.values(error.errors).map(error => error.message);
    super('Validation errors', 400, validationErrors);
  }
}

export default ValidationError; 