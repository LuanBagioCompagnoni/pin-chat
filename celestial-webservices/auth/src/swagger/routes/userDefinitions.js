const userDefinitions = {
  '/users': {
    get: {
      summary: 'Get a user',
      tags: ['Users'],
      parameters: [
        {
          in: 'query',
          name: 'id',
          schema: {
            type: 'string',
          },
          required: true,
          description: 'User ID',
        },
      ],
      responses: {
        200: {
          description: 'Get user successfully',
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'User not found',
        },
      },
    },
  },
  '/users/email': {
    get: {
      summary: 'Get a user by email',
      tags: ['Users'],
      parameters: [
        {
          in: 'param',
          name: 'email',
          schema: {
            type: 'string',
          },
          required: true,
          description: 'User email',
        },
      ],
      responses: {
        200: {
          description: 'Get user successfully',
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'User not found',
        },
      },
    },
  },
  '/users/delete': {
    delete: {
      summary: 'Delete a user',
      tags: ['Users'],
      parameters: [
        {
          in: 'query',
          name: 'id',
          schema: {
            type: 'string',
          },
          required: true,
          description: 'User ID',
        },
      ],
      responses: {
        200: {
          description: 'User deleted successfully',
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'User not found',
        },
      },
    },
  },
  '/users/update': {
    put: {
      summary: 'Update a user',
      tags: ['Users'],
      parameters: [
        {
          in: 'query',
          name: 'id',
          schema: {
            type: 'string',
          },
          required: true,
          description: 'User ID',
        },
      ],
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
          description: 'User updated successfully',
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'User not found',
        },
      },
    },
  },
};

export default userDefinitions;
