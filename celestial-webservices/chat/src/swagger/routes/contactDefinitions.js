const contactDefinitions = {
  '/contact': {
    get: {
      summary: 'Get contact',
      tags: ['Contact'],
      responses: {
        200: {
          description: 'Get contact successfully',
        },
        400: {
          description: 'Fail on get contact',
        },
        404: {
          description: 'Contact not found',
        },
      },
    },
  },
};

export default contactDefinitions;
