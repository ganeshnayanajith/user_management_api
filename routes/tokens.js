'use strict';
const express = require('express');
const router = express.Router();
const TokenHandler = require('../lib/handlers/TokenHandler');

/**
 *  @openapi
 *
 * definitions:
 *      TokenResponse:
 *          type: object
 *          properties:
 *              token:
 *                  type: string
 *
 */
module.exports = () => {
    /**
     * @openapi
     *
     * /tokens:
     *      post:
     *          produces:
     *              - application/json
     *          tags:
     *              - Auth Tokens
     *          requestBody:
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              email:
     *                                  type: string
     *                              password:
     *                                  type: string
     *          security:
     *              - Token: []
     *          responses:
     *              200:
     *                  description: Generate a auth token using email and password
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/definitions/TokenResponse'
     *
     */
    router.post('/', async (req, res, next) => {
        try {
            const result = await TokenHandler.generateToken(req.body);
            res.status(200).send(result);
        } catch (err) {
            if (err.statusCode) {
                return res.status(err.statusCode).send({
                    status: err.statusCode,
                    error: err.message
                });
            }
            return res.status(500).send({
                status: 500,
                error: 'Server Error'
            });
        }
    });

    return router;
};
