import BaseError from './BaseError.js';

class NoChangeError extends BaseError{
  constructor(){
    super('Document not changed!', 400);
  }
}

export default NoChangeError;