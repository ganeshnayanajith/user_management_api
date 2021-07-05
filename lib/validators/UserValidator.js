'use strict';
const Joi = require('joi');
const CustomHttpError = require('../CustomHttpError');

const schemaCreateUser = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    permissionLevel: Joi.string().required()
});

class UserValidator {
    static validateUserCreation(obj) {
        const { value, error } = schemaCreateUser.validate(obj);
        if (error) {
            return Promise.reject(new CustomHttpError(error.message, '400'));
        }
        return Promise.resolve(value);
    }
}

module.exports = UserValidator;
