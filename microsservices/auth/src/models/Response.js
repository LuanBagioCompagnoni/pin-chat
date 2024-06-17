export default class ResponseMessage{
    constructor(document = null, message = 'Sucess!', errors = null){
      this.message = message;
      this.document = document;
      this.errors = errors;
    }
  }