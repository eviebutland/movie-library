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


#### Validation
AJV is used by Open API backend and Fastify behind the scenes to validate routes, operation IDs, requests and responses
 - [Fastify Validation](https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/)

#### Authorisation and Authentication
For Authorisation I wanted to use JWT to follow the work project. JWT tokens allow for different roles/permissions where as API keys are application level. 
- [Fastify JWT token](https://github.com/fastify/fastify-jwt) is used to create and verify tokens. This allows me to store objects in an encryted value, seperated by dots i.e xxx.xxxxxxx.xxx. 
On login, we check the user exists within the database, and if successful we create a new JWT token for the user. This value is stored within a global variable within Postman so all endpoints requiring authentication have access to the latest token. This token has an expiry of one hour. 
If the user does not exist, they will get an error message and can use the create user endpoint to create one. This endpoint will set up the roles/permissions of the user and these values will be stored in their unique JWT token.

Per call, we have a fastify hook ('onRequest') to check if there is an authentication and x-api-key header being sent, verifying these before continuing with request. 

- Logout -> [Logouts with JWT](https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6). As described in the article, the JWT tokens cannot be manually expired. Currently, when the user calls the /auth/logout endpoint, they get a successful response and if they go to call an endpoint that requires authentication it fails with error FAST_JWT_MALFORMED. 
