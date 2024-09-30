import messageDefinitions from "./routes/messageDefinitions.js";
import contactDefinitions from "./routes/contactDefinitions.js"

const swaggerDefinitions = {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Documentation with Swagger',
    },
    servers: [
      {
        url: process.env.API_CHAT_URL,
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Message',
        description: 'Message related endpoints',
      },
      {
        name: 'Contact',
        description: 'contact management endpoints',
      },
    ],
    paths: {
      ...messageDefinitions,
      ...contactDefinitions,
    },
  };
  
  export default swaggerDefinitions;
  