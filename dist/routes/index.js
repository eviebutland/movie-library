"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responses = exports.handlers = exports.routes = void 0;
const index_js_1 = require("./movies/index.js");
const index_js_2 = require("./genres/index.js");
const index_js_3 = require("./actors/index.js");
const index_js_4 = require("./authentication/index.js");
const schema_js_1 = require("./actors/schema.js");
const schema_js_2 = require("./genres/schema.js");
const schema_js_3 = require("./movies/schema.js");
const schema_js_4 = require("./authentication/schema.js");
const permissions_js_1 = require("./authentication/permissions.js");
function routes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        // Auth
        fastify.post('/auth/login', index_js_4.authLogin);
        fastify.post('/auth/logout', index_js_4.authLogout);
        fastify.post('/auth/new', {
            schema: schema_js_4.UserSchema.post,
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'i', 'post');
            }
        }, index_js_4.createUser);
        // General
        fastify.get('/movies', {
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'm', 'get');
            }
        }, index_js_1.getListAllMovies);
        fastify.post('/movies/list', {
            schema: schema_js_3.MovieSchema.postMany,
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'm', 'post');
            }
        }, index_js_1.createListOfMovies);
        fastify.post('/movies', {
            schema: schema_js_3.MovieSchema.post,
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'm', 'post');
            }
        }, index_js_1.createMovie);
        // By name
        fastify.get('/movies/name/:name', {
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'm', 'get');
            }
        }, index_js_1.getMoviebyName);
        fastify.patch('/movies/name/:name', {
            schema: schema_js_3.MovieSchema.patch,
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'm', 'patch');
            }
        }, index_js_1.updateMovieByName);
        fastify.delete('/movies/name/:name', {
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'm', 'delete');
            }
        }, index_js_1.deleteMovieByName);
        // Genre
        fastify.post('/movies/genres', {
            schema: schema_js_2.GenreSchema.post,
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'g', 'post');
            }
        }, index_js_2.createGenre);
        fastify.get('/movies/genres', {
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'g', 'get');
            }
        }, index_js_2.getAllGenres);
        fastify.get('/movies/genres/:genre', {
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'g', 'get');
            }
        }, index_js_2.getListMoviesByGenre);
        fastify.delete('/movies/genres/:genre', {
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'g', 'delete');
            }
        }, index_js_2.deleteGenre);
        fastify.patch('/movies/genres/:genre', {
            schema: schema_js_2.GenreSchema.patch,
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'g', 'patch');
            }
        }, index_js_2.updateGenre);
        // By Id
        fastify.get('/movies/:id', {
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'm', 'get');
            }
        }, index_js_1.getMovieById);
        fastify.patch('/movies/:id', {
            schema: schema_js_3.MovieSchema.patch,
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'm', 'patch');
            }
        }, index_js_1.updateMovieById);
        fastify.delete('/movies/:id', {
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'm', 'delete');
            }
        }, index_js_1.deleteMovieById);
        // Actor
        fastify.get('/movies/actors', {
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'a', 'get');
            }
        }, index_js_3.getAllActors);
        fastify.get('/movies/actors/:id', {
            schema: { params: schema_js_1.ActorSchema.params },
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'a', 'get');
            }
        }, index_js_3.getActorById);
        fastify.post('/movies/actors', {
            schema: schema_js_1.ActorSchema.post,
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'a', 'post');
            }
        }, index_js_3.createActor);
        fastify.patch('/movies/actors/:id', {
            schema: schema_js_1.ActorSchema.post,
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'a', 'patch');
            }
        }, index_js_3.updateActorById);
        fastify.delete('/movies/actors/:id', {
            preHandler: function (request, reply, done) {
                (0, permissions_js_1.checkAuthorisation)(request, reply, done, 'a', 'delete');
            }
        }, index_js_3.deleteActorById);
    });
}
exports.routes = routes;
// Need to get this to validate the requests
function validationFailHandler(c, req, res) {
    return res.code(400).send({ status: 400, err: c.validation.errors });
}
exports.handlers = {
    getListAllMovies: index_js_1.getListAllMovies,
    getMovieById: index_js_1.getMovieById,
    updateMovieById: index_js_1.updateMovieById,
    getMoviebyName: index_js_1.getMoviebyName,
    createListOfMovies: index_js_1.createListOfMovies,
    createMovie: index_js_1.createMovie,
    updateMovieByName: index_js_1.updateMovieByName,
    deleteMovieByName: index_js_1.deleteMovieByName,
    deleteMovieById: index_js_1.deleteMovieById,
    getListMoviesByGenre: index_js_2.getListMoviesByGenre,
    getAllGenres: index_js_2.getAllGenres,
    createGenre: index_js_2.createGenre,
    updateGenre: index_js_2.updateGenre,
    deleteGenre: index_js_2.deleteGenre,
    getAllActors: index_js_3.getAllActors,
    getActorById: index_js_3.getActorById,
    createActor: index_js_3.createActor,
    updateActorById: index_js_3.updateActorById,
    deleteActorById: index_js_3.deleteActorById
};
exports.responses = {
    validationFailHandler
};
