'use strict';
const crypto = require('crypto');

class Utils {
    static getHash(strToHash) {
        const shasum = crypto.createHash('sha1');
        shasum.update(strToHash);
        return shasum.digest('hex');
    }
}

module.exports = Utils;