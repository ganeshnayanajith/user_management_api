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
const schemaGetUsers = Joi.object().keys({
    skip: Joi.number().default(0),
    limit: Joi.number().default(50)
});
const schemaUpdateUser = Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    password: Joi.string()
});

class UserValidator {
    static validateUserCreation(obj) {
        const { value, error } = schemaCreateUser.validate(obj);
        if (error) {
            return Promise.reject(new CustomHttpError(error.message, '400'));
        }
        return Promise.resolve(value);
    }

    static isValidGet(obj) {
        const { value, error } = schemaGetUsers.validate(obj);
        if (error) {
            return Promise.reject(new CustomHttpError(error.message, '400'));
        }
        return Promise.resolve(value);
    }

    static validateUserUpdating(obj) {
        const { value, error } = schemaUpdateUser.validate(obj);
        if (error) {
            return Promise.reject(new CustomHttpError(error.message, '400'));
        }
        return Promise.resolve(value);
    }
}

module.exports = UserValidator;
