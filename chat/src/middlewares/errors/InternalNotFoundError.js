import BaseError from './BaseError.js';

class InternalNotFoundError extends BaseError{
  constructor(type = 'Document'){
    super(`${type} not found`, 404);
  }
}

export default InternalNotFoundError;