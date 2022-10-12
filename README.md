## Movie library

### API

- Open API backend to define the routes and validation
- Fastify as the server, an alternative to ExpressJs [DOCS](https://github.com/fastify/fastify/blob/main/docs/Guides/Getting-Started.md). I picked this as have used ExpressJs before and wanted to try something new.
- Pino pretty to make the fastify logs easier to read
- Fastify offers additional functionality such as Hooks which we can attach to events such as 'onRequest', these can be used to check Authentication/Authorisation. To add, they also have decorators which allow for customisation of the request/reply objects used in the HTTP lifescyle. [Decorators](https://www.fastify.io/docs/latest/Reference/Decorators/#decorators), [Hooks](https://www.fastify.io/docs/latest/Reference/Hooks/#hooks)

### Database

- Researched free AWS noSQL database [DynanmoDB](https://www.integrate.io/blog/dynamodb-vs-mongodb-differences/#four)
  but decided that I want to learn how to secure the database and how to manage it myself. However, I do want to know more about AWS and its other services so planning on trialling DynanmoDB in the future.

- MongoDB Atlas - free noSQL document database in the cloud. Choose this as I have worked with MongoDB locally and will be able to build on my knowledge but not have as much of a steep learning curve as with DynanmoDB. To add, there was a [fastify/mongoDB plugin](https://github.com/fastify/fastify-mongodb). Selected AWS as the cloud provider and connected to new cluster in Mongo compass.

- ACID transcations: need to be covered in this project but is supported by Mongo. We need to make sure that the database either fully completes the task or doesn’t at all in order to ensure data is in the most consistent state

- Archive collection: I have created an archive collection for documents that have been soft deleted. I have done this because ...

## Typescript

I am starting to integrate Typescript into this project to help with intergrating it in the FE project at work. [Fastify and TypeScript](https://www.fastify.io/docs/latest/Reference/TypeScript/). I have used [ts-node-dev](https://github.com/wclr/ts-node-dev) as this compiles the app and re-runs it on a file save. I was getting a lot of errors related to including the file paths when importing to updated the files to be Typescript and removed .js from the references. I also needed to update the tsconfig.json file and update the module to commonJs (and update the package.json to match).

#### Validation

AJV is used by Open API backend and Fastify behind the scenes to validate routes, operation IDs, requests and responses

- [Fastify Validation](https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/)

#### Authorisation and Authentication

For Authorisation I wanted to use JWT to follow the work project. JWT tokens allow for different roles/permissions where as API keys are application level.

- [Fastify JWT token](https://github.com/fastify/fastify-jwt) is used to create and verify tokens. This allows me to store objects in an encryted value, seperated by dots i.e xxx.xxxxxxx.xxx.

On login, we check the user exists within the database, and if there password matches that user. If successful we create a new JWT token for the user. This value is stored within a global variable within Postman so all endpoints requiring authentication have access to the latest token. This token has an expiry of one hour.
If the user does not exist, they will get an error message and can use the create user endpoint to create one. This endpoint will set up the roles/permissions of the user and these values will be stored in their unique JWT token.

Per call, we have a fastify hook ('onRequest') to check if there is an authentication and x-api-key header being sent, verifying these before continuing with request.

The next step is handled by the preHandler hook which is defined within the options for each endpoint. This calls a function that check if the user has the correct permissions set up or will reply with a 401 error. The `hasAccess()` function within authentication/permissions.js file takes in the area and the minimum required access that endpoint needs. It converts the letter (a -> admin, w -> write, or r -> read) to a number. If the user's current permissions for that area are greater than equal to that number, they user has the correct permissions to access.

```
const ranking = {
    r: 1,
    w: 2,
    a: 3
  }
```

The areas are broken down into:

```
a -> actors
m -> movies
g -> genres
i -> identification

```

- Logout -> [Logouts with JWT](https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6). As described in the article, the JWT tokens cannot be manually expired. Currently, when the user calls the /auth/logout endpoint, they get a successful response and if they go to call an endpoint that requires authentication it fails with unauthorised error.

## Testing

I am creating unit tests for the endpoints using [Jest](https://jestjs.io/docs/getting-started) and following the [fastify documentation](https://www.fastify.io/docs/latest/Guides/Testing/). By default, Jest will run the tests in parallel that are in different files, if you want to run tests within the same file in parallel then you can prefix the test with `test.concurrent("add unavailable item to cart", async () => { /* */ })`. However, since each file is dependant on the test before it (to share data), we don't run those tests in parallel.
