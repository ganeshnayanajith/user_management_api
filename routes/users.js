'use strict';
const express = require('express');
const router = express.Router();
const UserHandler = require('../lib/handlers/UserHandler');
const UserValidator = require('../lib/validators/UserValidator');
const authorizer = require('../lib/security/authorizer');

/**
 *  @openapi
 *
 * definitions:
 *      UserResponse:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              firstName:
 *                  type: string
 *              lastName:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *              permissionLevel:
 *                  type: string
 *              createdBy:
 *                  type: string
 *              updatedBy:
 *                  type: string
 *              createdOn:
 *                  type: string
 *              updatedOn:
 *                  type: string
 *
 */
module.exports = (authenticator) => {
    /**
     * @openapi
     *
     * /users:
     *      post:
     *          produces:
     *              - application/json
     *          tags:
     *              - Users
     *          requestBody:
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              firstName:
     *                                  type: string
     *                              lastName:
     *                                  type: string
     *                              email:
     *                                  type: string
     *                              password:
     *                                  type: string
     *                              permissionLevel:
     *                                  type: string
     *          security:
     *              - Token: []
     *          responses:
     *              201:
     *                  description: Create a user
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     *                                  data:
     *                                      $ref: '#/definitions/UserResponse'
     *
     */
    router.post('/', authenticator, authorizer(['admin']), async (req, res, next) => {
        try {
            const loggedAdminId = req.user['_id'];
            const payload = req.body;
            const result = await UserHandler.create(loggedAdminId, payload);
            res.status(201).send(result);
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

    /**
     * @openapi
     *
     * /users/{id}:
     *      get:
     *          produces:
     *              - application/json
     *          tags:
     *              - Users
     *          parameters:
     *              - name: id
     *                type: string
     *                in: path
     *                required: true
     *          security:
     *              - Token: []
     *          responses:
     *              200:
     *                  description: Get a user by Id
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/definitions/UserResponse'
     *
     */
    router.get('/:id', authenticator, authorizer(['admin']), async (req, res, next) => {
        try {
            if (req.params['id']) {
                const userId = req.params['id'];
                const result = await UserHandler.get(userId);
                res.status(200).send(result);
            } else {
                return res.status(400).send({
                    status: 400,
                    error: 'user id is required'
                });
            }
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

    /**
     * @openapi
     *
     * /users:
     *      get:
     *          produces:
     *              - application/json
     *          tags:
     *              - Users
     *          parameters:
     *              - name: skip
     *                type: number
     *                in: query
     *              - name: limit
     *                type: number
     *                in: query
     *          security:
     *              - Token: []
     *          responses:
     *              200:
     *                  description: Get users
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: array
     *                              items:
     *                                  $ref: '#/definitions/UserResponse'
     *
     */
    router.get('/', authenticator, authorizer(['admin']), async (req, res, next) => {
        try {
            const validatedObj = await UserValidator.isValidGet(req.query);
            const result = await UserHandler.getAll(validatedObj.skip, validatedObj.limit);
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

    /**
     * @openapi
     *
     * /users/{id}:
     *      put:
     *          produces:
     *              - application/json
     *          tags:
     *              - Users
     *          parameters:
     *              - name: id
     *                type: string
     *                in: path
     *                required: true
     *          requestBody:
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              firstName:
     *                                  type: string
     *                              lastName:
     *                                  type: string
     *                              password:
     *                                  type: string
     *          security:
     *              - Token: []
     *          responses:
     *              200:
     *                  description: Update a user
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     *                                  data:
     *                                      $ref: '#/definitions/UserResponse'
     *
     */
    router.put('/:id', authenticator, authorizer(['admin']), async (req, res, next) => {
        try {
            if (req.params['id']) {
                const loggedAdminId = req.user['_id'];
                const userId = req.params['id'];
                const payload = req.body;
                const result = await UserHandler.update(loggedAdminId, userId, payload);
                res.status(200).send(result);
            } else {
                return res.status(400).send({
                    status: 400,
                    error: 'user id is required'
                });
            }
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

    /**
     * @openapi
     *
     * /users/{id}:
     *      delete:
     *          produces:
     *              - application/json
     *          tags:
     *              - Users
     *          parameters:
     *              - name: id
     *                type: string
     *                in: path
     *                required: true
     *          security:
     *              - Token: []
     *          responses:
     *              200:
     *                  description: Delete a user
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     *                                  data:
     *                                      $ref: '#/definitions/UserResponse'
     *
     */
    router.delete('/:id', authenticator, authorizer(['admin']), async (req, res, next) => {
        try {
            if (req.params['id']) {
                const userId = req.params['id'];
                const result = await UserHandler.delete(userId);
                res.status(200).send(result);
            } else {
                return res.status(400).send({
                    status: 400,
                    error: 'user id is required'
                });
            }
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
