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
          description: 'Users not found',
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
        200: {
          description: 'User updated successfully',
        },
        400: {
          description: 'Bad request',
        },
      },
    },
  },
};

export default userDefinitions;
