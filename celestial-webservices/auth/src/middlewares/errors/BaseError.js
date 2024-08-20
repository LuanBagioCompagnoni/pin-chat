class BaseError extends Error {
  constructor(message = 'Erro interno do servidor', status = 500, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.name = this.constructor.name;
  }

  sendResponse(res) {
    res.status(this.status).json(this.message);
  }
}

export default BaseError;
