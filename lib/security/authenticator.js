'use strict';
const config = require('../config');
const logger = require('../logger');
const log = logger(config.logger);
const UserModel = require('../db/models/user.model');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = (passport, { secret, issuer, audience }) => {
    const passportOpts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };
    if (issuer) {
        passportOpts.issuer = issuer;
    }
    if (audience) {
        passportOpts.audience = audience;
    }

    passport.use(new JwtStrategy(passportOpts, function (jwtPayload, done) {
        const filter = {
            email: jwtPayload.email,
            password: jwtPayload.password
        };
        UserModel.findOne(filter, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}
