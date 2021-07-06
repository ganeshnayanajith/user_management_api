'use strict';
const express = require('express');
const router = express.Router();
const TokenHandler = require('../lib/handlers/TokenHandler');

module.exports = () => {
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
