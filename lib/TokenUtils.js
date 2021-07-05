'use strict';
require('dotenv').config();
const jwt = require('jsonwebtoken');
const config = require('./config');
const secretConfig = require('../secretConfig');

class TokeUtils {
    static generateToken({ id, email, permissionLevel }) {
        const opts = {
            expiresIn: '1d',
            subject: id
        };
        if (config.jwt.issuer) {
            opts.issuer = config.jwt.issuer;
        }
        if (config.jwt.audience) {
            opts.audience = config.jwt.audience;
        }
        const token = jwt.sign({
            id,
            email,
            permissionLevel
        }, secretConfig.JWT_SECRET, opts);
        return Promise.resolve(token);
    }

    static generateTestToken() {
        return this.generateToken({
            id: '34d46a80-ddb4-11eb-ac3b-e952629395de',
            email: 'ganeshnayanajith40@gmail.com',
            permissionLevel: 'admin'
        });
    }
}

module.exports = TokeUtils;
