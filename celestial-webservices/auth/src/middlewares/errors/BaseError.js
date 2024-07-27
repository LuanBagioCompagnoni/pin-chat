class BaseError extends Error{
  constructor(message = 'Internal server error', status = 500, errors){
    super();
    this.status = status;
    this.message = message;
    this.errors = errors;
  }

  sendResponse(res){
    res.status(this.status).json(this.message);
  }

}

export default BaseError;