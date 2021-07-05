'use strict';
const config = require('../../config');
const logger = require('../../logger');
const log = logger(config.logger);
const UserModel = require('../models/user.model');

class UserDAO {
    static async insert(payload) {
        try {
            const newUser = new UserModel(payload);
            const result = await newUser.save();
            return Promise.resolve(result);
        } catch (error) {
            log.error(error);
            return Promise.reject(error);
        }
    }
}

module.exports = UserDAO;