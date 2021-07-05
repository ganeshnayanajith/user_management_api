'use strict';
const express = require('express');
const router = express.Router();
const UserHandler = require('../lib/handlers/UserHandler');

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
    return router;
};
