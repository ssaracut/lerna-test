'use strict';

const Hapi = require('hapi');
const Joi = require('joi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const logSomething = require('@lerna-test/util');

(async () => {

    // Create a server with a host and port
    const server = Hapi.server({
        host: 'localhost',
        port: 8000
    });

    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: Pack.version,
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    // Add the route
    server.route({
        method: 'GET',
        path: '/hello',
        handler: function (request, h) {
            return 'hello world';
        }
    });

    // Add the route
    server.route({
        method: 'GET',
        path: '/hello/{name}',
        handler: function (request, h) {
            return `hello &nbsp; ${encodeURIComponent(logSomething(request.params.name))}`;
        },
        config: {
            tags: ['api'],
            validate: {
                params: {
                    name: Joi.string().alphanum().required()
                }
            }
        }
    });


    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

})()
