'use strict';
const config = require('../config');
const logger = require('../logger');
const log = logger(config.logger);
const uuid = require('uuid');
const UserValidator = require('../validators/UserValidator');
const UserDAO = require('../db/dao/UserDAO');

class UserHandler {
    static async create(loggedAdminId, payload) {
        try {
            const validatePayload = await UserValidator.validateUserCreation(payload);
            validatePayload._id = uuid.v1();
            validatePayload.createdBy = loggedAdminId;
            validatePayload.updatedBy = loggedAdminId;
            const result = await UserDAO.insert(validatePayload);
            return Promise.resolve(result);
        } catch (error) {
            log.error(error);
            return Promise.reject(error);
        }
    }
}

module.exports = UserHandler;