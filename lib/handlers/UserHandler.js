'use strict';
const config = require('../config');
const logger = require('../logger');
const log = logger(config.logger);
const uuid = require('uuid');
const UserValidator = require('../validators/UserValidator');
const UserDAO = require('../db/dao/UserDAO');
const Utils = require('../Utils');

class UserHandler {
    static async create(loggedAdminId, payload) {
        try {
            const validatePayload = await UserValidator.validateUserCreation(payload);
            validatePayload._id = uuid.v1();
            validatePayload.password = Utils.getHash(validatePayload.password);
            validatePayload.createdBy = loggedAdminId;
            validatePayload.updatedBy = loggedAdminId;
            const result = await UserDAO.insert(validatePayload);
            return Promise.resolve(result);
        } catch (error) {
            log.error(error);
            return Promise.reject(error);
        }
    }

    static async get(userId) {
        try {
            const result = await UserDAO.get(userId);
            return Promise.resolve(result);
        } catch (error) {
            log.error(error);
            return Promise.reject(error);
        }
    }

    static async getAll(skip, limit) {
        try {
            const result = await UserDAO.getAll(skip, limit);
            return Promise.resolve(result);
        } catch (error) {
            log.error(error);
            return Promise.reject(error);
        }
    }

    static async update(loggedAdminId, userId, payload) {
        try {
            const validatedPayload = await UserValidator.validateUserUpdating(payload);
            if (validatedPayload.password) {
                validatedPayload.password = Utils.getHash(validatedPayload.password);
            }
            validatedPayload.updatedBy = loggedAdminId;
            const result = await UserDAO.update(userId, validatedPayload);
            return Promise.resolve(result);
        } catch (error) {
            log.error(error);
            return Promise.reject(error);
        }
    }

    static async delete(userId) {
        try {
            const result = await UserDAO.delete(userId);
            return Promise.resolve(result);
        } catch (error) {
            log.error(error);
            return Promise.reject(error);
        }
    }

    static async getByEmailAndPassword(email, password) {
        try {
            const hashedPassword = Utils.getHash(password);
            const result = await UserDAO.getByEmailAndPassword(email, hashedPassword);
            return Promise.resolve(result);
        } catch (error) {
            log.error(error);
            return Promise.reject(error);
        }
    }
}

module.exports = UserHandler;