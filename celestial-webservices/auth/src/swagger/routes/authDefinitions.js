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
                name: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                admin: { type: 'boolean' },
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
  '/auth/verifyToken': {
    post: {
      summary: 'Verify token status',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              headers: {
                authorization: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Token is valid',
        },
        401: {
          description: 'Token is not valid',
        },
      },
    },
  },
}

export default authDefinitions