'use strict';
const Joi = require('joi');
const CustomHttpError = require('../CustomHttpError');

const schemaGetToken = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
});

class TokenValidator {
    static isValidGet(obj) {
        const { value, error } = schemaGetToken.validate(obj);
        if (error) {
            return Promise.reject(new CustomHttpError(error.message, '400'));
        }
        return Promise.resolve(value);
    }
}

module.exports = TokenValidator;
