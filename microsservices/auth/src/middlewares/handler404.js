import InternalNotFoundError from './errors/InternalNotFoundError.js';

function handler404(req, res, next){
  const error404 = new InternalNotFoundError('Page');
  next(error404);
}

export default handler404;