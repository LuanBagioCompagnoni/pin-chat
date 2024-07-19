import express from 'express';
import auth from './auth.js'

const routes = (app) => {
  app.route('/').get((req, res) => res.status(200).send('Wellcome, see the documentation :)'));
  app.use(express.json(), auth);
};

export default routes;