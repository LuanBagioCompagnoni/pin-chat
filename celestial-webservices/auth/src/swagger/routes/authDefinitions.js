const authDefinitions = {
'/auth/login': {
    post: {
      summary: 'Login a user',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string' },
                password: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Login successful',
        },
        401: {
          description: 'Unauthorized',
        },
      },
    },
  },
  '/auth/register': {
    post: {
      summary: 'Register a new user',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string' },
                password: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'User created successfully',
        },
        400: {
          description: 'Bad request',
        },
      },
    },
  },
}

export default authDefinitions