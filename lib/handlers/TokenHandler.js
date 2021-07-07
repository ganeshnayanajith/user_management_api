'use strict';
const config = require('../config');
const logger = require('../logger');
const log = logger(config.logger);
const TokenValidator = require('../validators/TokenValidator');
const UserHandler = require('../handlers/UserHandler');
const TokenUtils = require('../TokenUtils');
const CustomHttpError = require('../CustomHttpError');

class TokenHandler {
    //generate a token with credentials
    static async generateToken(payload) {
        try {
            const { email, password } = await TokenValidator.isValidGet(payload);
            const user = await UserHandler.getByEmailAndPassword(email, password);
            if (!user) {
                return Promise.reject(new CustomHttpError('Invalid credentials', 400));
            }
            const token = await TokenUtils.generateToken({ email, password });
            return Promise.resolve({ token });
        } catch (error) {
            log.error(error);
            return Promise.reject(error);
        }
    }
}

module.exports = TokenHandler;