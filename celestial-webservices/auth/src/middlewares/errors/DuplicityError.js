import BaseError from './BaseError.js';

class DuplicityError extends BaseError{
  constructor(message = 'Registro'){
    super(`${message} já existe!`, 409);
  }
}

export default DuplicityError;