import InvalidRequestError from './errors/InvalidRequestError.js';
import ResponseMessage from '../models/Response.js';

async function page(req, res, next){
  try {
    let { limit = 5, page = 1, ordenation = '_id:-1'} = req.query;

    let [shortField, order] = ordenation.split(':');
  
    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);

    const result = req.result;
  
    if(limit > 0 && page > 0){
      const document = await result.find()
        .sort({ [shortField]: order})
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
          
      res.status(200).send(new ResponseMessage(document));
    }else{
      next(new InvalidRequestError());
    }
  
  } catch (error) {
    next(error);
  }
}

export default page;