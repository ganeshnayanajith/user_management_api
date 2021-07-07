'use strict';
const lodash = require('lodash');

const getAuthorized = (roles) => {
    return (req, res, next) => {
        if (lodash.includes(roles, req.user.permissionLevel)) {
            next();
        } else {
            res.sendStatus(403);
        }
    }
};

module.exports = getAuthorized;