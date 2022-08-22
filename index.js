import OpenAPIBackend from "openapi-backend";

// Create api with the open API file
const api = new OpenAPIBackend({definition: './movies.yml'})