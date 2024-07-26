const userDefinitions = {
  '/users': {
    get: {
      summary: 'List users',
      tags: ['Users'],
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
  '/users/{id}': {
    get: {
      summary: 'Get a user',
      tags: ['Users'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: {
            type: 'string',
          },
          required: false,
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
    delete: {
      summary: 'Delete a user',
      tags: ['Users'],
      parameters: [
        {
          in: 'path',
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
    put: {
      summary: 'Update a user',
      tags: ['Users'],
      parameters: [
        {
          in: 'path',
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
