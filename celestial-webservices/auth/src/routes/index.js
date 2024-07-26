import express from 'express';
import authRoutes from './auth.js';
import userRoutes from './user.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from '../swagger/swaggerOptions.js';

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const routes = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 
  app.use(express.json());
  app.use('/auth', authRoutes); 
  app.use('/users', userRoutes); 
};

export default routes;
