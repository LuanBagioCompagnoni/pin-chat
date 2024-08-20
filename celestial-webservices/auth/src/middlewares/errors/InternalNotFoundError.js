import BaseError from './BaseError.js';

class InternalNotFoundError extends BaseError {
  constructor(type = 'Registro') {
    super(`${type} não encontrado!`, 404);
  }
}

export default InternalNotFoundError;
