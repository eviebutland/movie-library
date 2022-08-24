import { OpenAPIBackend, OpenAPIRouter } from 'openapi-backend';
const api = new OpenAPIBackend({
    definition: './movies.yml',
    strict: true,
    quick: false,
    validate: true,
    ignoreTrailingSlashes: true,
    // ajvOpts: { unknownFormats: true }, // ajv is validation
})

//   api.register({
//     getListAllMovies:(c, req, res) => { 
//         console.log(c)

//         res.status(200).json({ result: 'ok' }
//     )}
//   })

api.register('getListAllMovies', function (c, req, res) {
    console.log(req)
    return {
        status: 200,
        body: JSON.stringify(['pet1', 'pet2']),
    }
})

api.init()

const router = new OpenAPIRouter({
    definition: './movies.yml',
    apiRoot: '/',
    ignoreTrailingSlashes: true,
})



const parsedRequest = router.parseRequest({
method: 'GET',
path: '/',
headers: {
    accept: 'application/json',
    // cookie: 'token=abc123;path=/',
    },
}, router.getOperation('getListAllMovies'));
  
console.log(parsedRequest, 'get');