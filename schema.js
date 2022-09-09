export const document = {
  openapi: '3.0.1',
  info: {
    title: 'My API',
    version: '1.0.0'
  },
  paths: {
    '/movies': {
      get: {
        tags: ['general'],
        summary: 'Get all movies',
        operationId: 'getListAllMovies',
        security: [
          {
            main_auth: ['read:users']
          },
          {
            api_key: []
          }
        ],

        responses: {
          200: {
            $ref: '#/components/schemas/Movie'
          },
          403: {
            description: 'Forbidden'
          },
          404: {
            $ref: '#/components/schemas/NotFound'
          }
        }
      },
      post: {
        tags: ['general'],
        summary: 'Create a single movie to add to database',
        operationId: 'createMovie',
        security: [
          {
            api_key: []
          },
          {
            basic_auth: []
          }
        ],
        responses: {
          200: {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'Calls per hour allowed by the user.',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                // $ref: '#/components/headers/ExpiresAfter'
              }
            }

            // $ref: '#/components/schemas/Movie'
          },
          400: {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  //   $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          }
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Movie'
              }
            }
          },
          description: 'requestBody description',
          required: true
        }
      }
    },
    '/movies/list': {
      post: {
        tags: ['general'],
        summary: 'Create a list of movies to add to database for seeding',
        operationId: 'createListOfMovies',
        security: [
          {
            api_key: []
          },
          {
            basic_auth: []
          }
        ],
        responses: {
          200: {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'Calls per hour allowed by the user.',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                // $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Movie' }
                }
              }
            }
          },
          400: {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          }
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Movie' }
              }
            }
          },
          description: 'requestBody description',
          required: true
        }
      }
    },
    '/movies/genre': {
      post: {
        tags: ['genre'],
        summary: 'Create a new genre',
        operationId: 'createGenre',
        security: [
          {
            api_key: []
          },
          {
            basic_auth: []
          }
        ],
        responses: {
          200: {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'Calls per hour allowed by the user.',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                // $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Genre'
                }
              }
            }
          },
          400: {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          }
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Genre'
              }
            }
          },
          description: 'requestBody description',
          required: true
        }
      },
      get: {
        tags: ['genre'],
        summary: 'Get all genres',
        operationId: 'getAllGenres',
        security: [
          {
            main_auth: ['read:users']
          },
          {
            api_key: []
          }
        ],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Genre' }
                }
              }
            }
          },
          403: {
            description: 'Forbidden'
          },
          404: {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      }
    },
    '/movies/genre/{genre}': {
      parameters: [
        {
          name: 'genre',
          in: 'query',
          description: 'Get movies by genre',
          schema: {
            type: 'string'
          }
        }
      ],
      get: {
        tags: ['genre'],
        summary: 'Get movies by genre',
        operationId: 'getListMoviesByGenre',
        parameters: [
          {
            name: 'genre',
            in: 'path',
            description: 'Get a list of movies by genre',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            main_auth: ['read:users']
          },
          {
            api_key: []
          }
        ],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Genre' }
                }
              }
            }
          },
          403: {
            description: 'Forbidden'
          },
          404: {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      },
      patch: {
        tags: ['genre'],
        summary: 'Updates the genre',
        operationId: 'updateGenre',
        parameters: [
          {
            name: 'genre',
            in: 'path',
            description: 'The name that needs to be updated',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            main_auth: ['write:users']
          }
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Genre'
                }
              }
            }
          },
          400: {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          },
          404: {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Genre'
              }
            }
          },
          description: 'Updated user object',
          required: true
        }
      },
      delete: {
        tags: ['genre'],
        summary: 'Deletes a genre for a movie',
        operationId: 'deleteGenre',
        parameters: [
          {
            name: 'genre',
            in: 'path',
            description: 'The name that needs to be updated',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            main_auth: ['write:users']
          }
        ],
        responses: {
          200: {
            description: 'OK'
          },
          400: {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          },
          404: {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      }
    },
    '/movies/name/{name}': {
      get: {
        tags: ['name'],
        summary: 'Get movie by name',
        operationId: 'getMoviebyName',
        parameters: [
          {
            name: 'name',
            in: 'path',
            description: 'The name of a movie that needs to be retrieved',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            api_key: []
          },
          {
            basic_auth: []
          }
        ],
        responses: {
          200: {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'calls per hour allowed by the user',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                // $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Movie'
                }
              }
            }
          },
          404: {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      },
      patch: {
        tags: ['name'],
        summary: 'Update movie by name',
        operationId: 'updateMovieByName',
        parameters: [
          {
            name: 'name',
            in: 'path',
            description: 'The name that needs to be updated',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            api_key: []
          },
          {
            basic_auth: []
          }
        ],
        responses: {
          200: {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'calls per hour allowed by the user',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                // $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Movie'
                }
              }
            }
          },
          400: {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          },
          404: {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Movie'
              }
            }
          },
          description: 'Echo payload',
          required: true
        }
      },
      delete: {
        tags: ['name'],
        summary: 'Delete movie by name',
        operationId: 'deleteMovieByName',
        parameters: [
          {
            name: 'name',
            in: 'path',
            description: 'The name that needs to be deleted',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            api_key: []
          },
          {
            basic_auth: []
          }
        ],
        responses: {
          200: {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'calls per hour allowed by the user',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                // $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  type: 'string'
                },
                examples: {
                  response: {
                    value: 'Successfully deleted'
                  }
                }
              }
            }
          },
          404: {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      }
    },
    '/movies/{id}': {
      get: {
        tags: ['id'],
        summary: 'Get movie by id',
        operationId: 'getMovieById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The name of a movie that needs to be retrieved',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            api_key: []
          },
          {
            basic_auth: []
          }
        ],
        responses: {
          200: {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'calls per hour allowed by the user',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                // $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Movie'
                }
              }
            }
          },
          404: {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      },
      patch: {
        tags: ['id'],
        summary: 'Update movie by id',
        operationId: 'updateMovieById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The name that needs to be updated',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            api_key: []
          },
          {
            basic_auth: []
          }
        ],
        responses: {
          200: {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'calls per hour allowed by the user',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                // $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Movie'
                }
              }
            }
          },
          400: {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          },
          404: {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Movie'
              }
            }
          },
          description: 'Movie patch request body',
          required: true
        }
      },
      delete: {
        tags: ['id'],
        summary: 'Delete movie by id',
        operationId: 'deleteMovieById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The id of a movie that needs to be deleted',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            api_key: []
          },
          {
            basic_auth: []
          }
        ],
        responses: {
          200: {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'calls per hour allowed by the user',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                // $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  type: 'string'
                },
                example: 'Successfully deleted'
              }
            }
          },
          404: {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      }
    },
    '/movies/actor': {
      post: {
        tags: ['actor'],
        summary: 'Create an actor',
        operationId: 'createActor',
        security: [
          {
            api_key: []
          },
          {
            basic_auth: []
          }
        ],
        responses: {
          200: {
            $ref: '#/components/schemas/Actor'
          },
          400: {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          }
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Actor'
              }
            }
          },
          description: 'Echo payload',
          required: true
        }
      },
      get: {
        tags: ['actor'],
        summary: 'Get all actors',
        operationId: 'getAllActors',
        security: [
          {
            api_key: []
          },
          {
            basic_auth: []
          }
        ],
        responses: {
          200: {
            $ref: '#/components/schemas/Actor'
          },
          404: {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      }
    },
    '/movies/actor/{id}': {
      get: {
        tags: ['actor'],
        summary: 'Get actor by id',
        operationId: 'getActorById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The name of an actor that needs to be retrieved',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            api_key: []
          },
          {
            basic_auth: []
          }
        ],
        responses: {
          200: {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'calls per hour allowed by the user',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                // $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  type: 'string'
                },
                examples: {
                  response: {
                    $ref: '#/components/schemas/Movie'
                  }
                }
              }
            }
          },
          404: {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      },
      patch: {
        tags: ['actor'],
        summary: 'Update an actor by id',
        operationId: 'updateActorById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The actor that needs to be updated',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            api_key: []
          },
          {
            basic_auth: []
          }
        ],
        responses: {
          200: {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'calls per hour allowed by the user',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                // $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  type: 'object'
                },
                examples: {
                  response: {
                    $ref: '#/components/schemas/Actor'
                  }
                }
              }
            }
          },
          400: {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          },
          404: {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'string',
                example: 'Hello world!'
              }
            },
            'application/xml': {
              schema: {
                type: 'string',
                example: 'Hello world!'
              }
            }
          },
          description: 'Echo payload',
          required: true
        }
      },
      delete: {
        tags: ['actor'],
        summary: 'Delete actor by id',
        operationId: 'deleteActorById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The actor that needs to be deleted',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            api_key: []
          },
          {
            basic_auth: []
          }
        ],
        responses: {
          200: {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'calls per hour allowed by the user',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                // $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  type: 'string'
                },
                examples: {
                  response: {
                    value: 'Hello world!'
                  }
                }
              }
            }
          },
          404: {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    parameters: {},
    schemas: {
      Movie: {
        required: ['name', 'key', 'yearReleased'],
        properties: {
          name: {
            type: 'string',
            minLength: 4,
            example: 'The greatest showman'
          },
          key: {
            type: 'string',
            minLength: 4,
            example: 'the-greatest-showman'
          },
          yearReleased: {
            type: 'number',
            minLength: 4,
            example: 2022
          },
          description: {
            type: 'string',
            minLength: 10,
            example: 'This is a musical'
          },
          keyWords: {
            type: 'array',
            // items: {
            //   type: 'string'
            // },
            minLength: 1,
            example: ['musical', 'romance', 'feel-good']
          },
          actors: {
            type: 'array',
            // items: {
            //   type: 'string'
            // },
            minLength: 1,
            example: ['Hugh Jackman', 'Zac Efron', 'Zendaya']
          },
          image: {
            description: 'An image from the movie',
            type: 'string',
            minLength: 1,
            example: 'https://en.wikipedia.org/wiki/The_Greatest_Showman'
          },
          boxOfficeTotal: {
            description: 'How much did the movie make in box office?',
            type: 'number',
            minLength: 1,
            example: 434.9
          },
          genre: {
            description: 'Genre of the movie',
            type: 'string',
            example: 'Comedy'
          },
          rating: {
            description: 'This is the rating of the movie',
            type: 'number',
            minLength: 1,
            example: 4.9
          },
          trailerUrl: {
            description: 'A Url to the trailer',
            type: 'string',
            minLength: 1,
            example: 'https://en.wikipedia.org/wiki/The_Greatest_Showman'
          }
        }
      },
      Actor: {
        properties: {
          name: {
            description: 'Name of the actor',
            type: 'string',
            example: 'Hugh Jackman'
          },
          dateOfBirth: {
            description: 'Date of birth of actor',
            type: 'string',
            example: '2022-08-23T06:56:16Z'
          },
          moviesAppearedIn: {
            description: 'The movies the actor has appeared in',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string'
                },
                label: {
                  type: 'string',
                  description: 'kebab cased name'
                }
              }
            },
            example: [
              {
                name: 'The greatest showman',
                label: 'the-greatest-showman'
              }
            ]
          },
          gender: {
            description: "The actor's gender",
            type: 'string',
            example: 'male'
          },
          bornIn: {
            description: 'This is where the actor is from',
            type: 'string',
            example: 'Hampshire, United Kindom'
          },
          awards: {
            description: 'The awards this actor has recieved',
            type: 'array',
            items: {
              type: 'string'
            },
            example: ['Grammy award 2017', 'Oscar - best actor 2019']
          }
        }
      },
      Genre: {
        title: 'Genre',
        properties: {
          name: {
            description: 'The name of the genre',
            type: 'string',
            example: 'Comedy'
          },
          characteristics: {
            description: 'What is this genre like',
            type: 'array',
            items: {
              type: 'string'
            },
            example: ['upbeat', 'happy', 'makes you laugh']
          }
        }
      },
      BadRequest: {
        properties: {
          code: {
            type: 'integer',
            description: 'The error code',
            example: 400
          },
          error: {
            type: 'string',
            description: 'The error.'
          }
        }
      },
      NotFound: {
        properties: {
          code: {
            type: 'integer',
            description: 'The error code',
            example: 404
          },
          error: {
            type: 'string',
            description: 'The error.',
            example: 'Could not be found'
          }
        }
      }
    }
  }
}
