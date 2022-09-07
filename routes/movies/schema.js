const movies = {
  get: {
    responseSchema: { movies: { type: 'array', items: { $ref: '#/components/schemas/Movie' } } },
    tags: ['general'],
    summary: 'Get all movies',
    description: 'Get all movies\n',
    operationId: 'getListAllMovies',
    security: [
      {
        main_auth: ['read:users']
      },
      {
        api_key: []
      }
    ]
  }
}
