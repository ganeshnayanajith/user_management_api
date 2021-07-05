'use strict';
require('dotenv').config();
const jwt = require('jsonwebtoken');
const config = require('./config');
const secretConfig = require('../secretConfig');

class TokeUtils {
    static generateToken({ email, password }) {
        const opts = {
            expiresIn: '1d',
            subject: email
        };
        if (config.jwt.issuer) {
            opts.issuer = config.jwt.issuer;
        }
        if (config.jwt.audience) {
            opts.audience = config.jwt.audience;
        }
        const token = jwt.sign({
            email,
            password
        }, secretConfig.JWT_SECRET, opts);
        return Promise.resolve(token);
    }

    static generateTestToken() {
        return this.generateToken({
            email: 'ganeshnayanajith40@gmail.com',
            password: 'password'
        });
    }
}

module.exports = TokeUtils;
