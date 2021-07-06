'use strict';
const express = require('express');
const router = express.Router();
const TokenUtils = require('../lib/TokenUtils');
const TokenValidator = require('../lib/validators/TokenValidator');

module.exports = () => {
    router.post('/', async (req, res, next) => {
        try {
            const payload = await TokenValidator.isValidGet(req.body);
            const token = await TokenUtils.generateToken(payload);
            res.status(200).send({ token });
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
