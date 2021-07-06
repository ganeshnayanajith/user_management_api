'use strict';
const config = require('../../config');
const logger = require('../../logger');
const log = logger(config.logger);
const UserModel = require('../models/user.model');
const CustomHttpError = require('../../CustomHttpError');

class UserDAO {
    static async insert(payload) {
        try {
            const newUser = new UserModel(payload);
            const result = await newUser.save();
            if (result) {
                return Promise.resolve({
                    message: 'user is created successfully',
                    data: result
                });
            } else {
                return Promise.reject(new CustomHttpError('user creation is failed', 500));
            }
        } catch (error) {
            log.error(error);
            return Promise.reject(error);
        }
    }

    static async get(userId) {
        try {
            const filter = {
                _id: userId
            }
            const result = await UserModel.findOne(filter).lean();
            return Promise.resolve(result);
        } catch (error) {
            log.error(error);
            return Promise.reject(error);
        }
    }

    static async getAll(skip, limit) {
        try {
            const cursor = UserModel.find().sort({ createdOn: -1 });

            if (skip) {
                cursor.skip(skip);
            }
            if (limit) {
                cursor.limit(limit);
            }

            const result = await cursor.lean();

            return Promise.resolve(result);
        } catch (error) {
            log.error(error);
            return Promise.reject(error);
        }
    }

    static async update(userId, payload) {
        try {
            const filter = {
                _id: userId
            };
            const update = {
                $set: payload,
                $currentDate: { updatedOn: true }
            };
            const options = {
                upsert: false,
                new: true
            };
            const result = await UserModel.findOneAndUpdate(filter, update, options).lean();
            if (result) {
                return Promise.resolve({
                    message: 'user is updated successfully',
                    data: result
                });
            } else {
                return Promise.reject(new CustomHttpError('user updating is failed', 500));
            }
        } catch (error) {
            log.error(error);
            return Promise.reject(error);
        }
    }

    static async delete(userId) {
        try {
            const filter = {
                _id: userId
            };
            const result = await UserModel.findOneAndDelete(filter).lean();
            if (result) {
                return Promise.resolve({
                    message: 'user is deleted successfully',
                    data: result
                });
            } else {
                return Promise.reject(new CustomHttpError('user deleting is failed', 500));
            }
        } catch (error) {
            log.error(error);
            return Promise.reject(error);
        }
    }

    static async getByEmailAndPassword(email, password) {
        try {
            try {
                const filter = {
                    email,
                    password
                }
                const result = await UserModel.findOne(filter).lean();
                return Promise.resolve(result);
            } catch (error) {
                log.error(error);
                return Promise.reject(error);
            }
        } catch (error) {
            log.error(error);
            return Promise.reject(error);
        }
    }
}

module.exports = UserDAO;