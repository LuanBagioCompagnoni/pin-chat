import authDefinitions from "./routes/authDefinitions.js";
import userDefinitions from "./routes/userDefinitions.js"

const swaggerDefinitions = {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Documentation with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Auth',
        description: 'Authentication related endpoints',
      },
      {
        name: 'Users',
        description: 'User management endpoints',
      },
    ],
    paths: {
      ...authDefinitions,
      ...userDefinitions,
    },
  };
  
  export default swaggerDefinitions;
  