import express from 'express';
import messageRoutes from './message.js';
/*import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from '../swagger/swaggerOptions.js';

const swaggerSpec = swaggerJsdoc(swaggerOptions);
*/
const routes = (app) => {
    //app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use(express.json());
    app.use('/message', messageRoutes);
    /*app.use('/', (req, res) => {
        res.redirect('/api-docs');
    })*/
};

export default routes;
