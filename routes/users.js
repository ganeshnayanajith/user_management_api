'use strict';
const express = require('express');
const router = express.Router();
const UserHandler = require('../lib/handlers/UserHandler');
const UserValidator = require('../lib/validators/UserValidator');

module.exports = (authenticator) => {
    router.post('/', authenticator, async (req, res, next) => {
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

    router.get('/:id', authenticator, async (req, res, next) => {
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

    router.get('/', authenticator, async (req, res, next) => {
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

    return router;
};
