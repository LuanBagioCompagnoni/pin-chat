import BaseError from './BaseError.js';

class NoChangeError extends BaseError{
  constructor(type = 'Document'){
    super(`${type} not changed!`, 400);
  }
}

export default NoChangeError;