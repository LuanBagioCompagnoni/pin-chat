const messageDefinitions = {
'/message': {
    get: {
      summary: 'Get messages for a contact',
      tags: ['Message'],
      parameters: [
        {
          name: 'contactId',
          in: 'query',
          description: 'ID of the contact to retrieve messages for',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Get successful',
        },
        400: {
          description: 'Fail on get messages',
        },
        404: {
          description: 'Messages not found',
        },
      },
    },
    post: {
      summary: 'Send message for a contact',
      tags: ['Message'],
      parameters: [
        {
          name: 'contactId',
          in: 'query',
          description: 'ID of the contact to retrieve messages for',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Send successful',
        },
        400: {
          description: 'Fail on send message',
        },
      },
    },
  },
}

export default messageDefinitions