import ResponseMessage from '../../models/Response.js';

class BaseError extends Error{
  constructor(message = 'Internal server error', status = 500, errors){
    super();
    this.status = status;
    this.message = message;
    this.errors = errors;
  }

  sendResponse(res){
    res.status(this.status).json(new ResponseMessage(null, this.message, this.errors));
  }

}

export default BaseError;