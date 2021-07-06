'use strict';
require('dotenv').config();
const jwt = require('jsonwebtoken');
const config = require('./config');
const secretConfig = require('../secretConfig');
const Utils = require('../lib/Utils');

class TokeUtils {
    static async generateToken({ email, password }) {
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
        password = Utils.getHash(password);
        const token = jwt.sign({
            email,
            password
        }, secretConfig.JWT_SECRET, opts);
        return Promise.resolve(token);
    }

    static async generateTestToken() {
        const token = await this.generateToken({
            email: 'keeneyesolutions@gmail.com',
            password: 'password'
        });
        return Promise.resolve(token);
    }
}

module.exports = TokeUtils;
