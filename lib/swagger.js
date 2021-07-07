'use strict';
const config = require('./config');

class Swagger {
    static getOptions() {
        return {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "User Management API",
                    version: "1.0.0",
                    description: "This is a REST API for manage users",
                    contact: {
                        name: "Ganesh Nayanajith Lokugamage",
                        email: "ganeshnayanajith40@gmail.com",
                    },
                },
                servers: [
                    {
                        url: config.swagger.server,
                    },
                ],
                components: {
                    securitySchemes: {
                        Token: {
                            scheme: 'bearer',
                            type: 'http',
                            in: 'header'
                        }
                    }
                }
            },
            apis: ["../routes/*.js"],
        };
    }
}

module.exports = Swagger;