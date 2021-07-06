'use strict';
const secretConfig = require('../../../secretConfig');
const config = require('../../config');
const logger = require('../../logger');
const log = logger(config.logger);
const mongoose = require('mongoose');

let conn = null;

const db = mongoose.connection;
db.on('error', () => {
    log.error('mongodb connection error');
});
db.once('open', function () {
    log.info('mongodb connected');
});

class MongooseConnector {
    static async initialize() {
        try {
            if (conn === null) {
                log.info('connecting to mongodb...');
                conn = mongoose.connect(secretConfig.MONGO_URL, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                    bufferCommands: false,
                    bufferMaxEntries: 0,
                    dbName: secretConfig.MONGO_DATABASE
                });
                await conn;
                log.info('connected to mongodb');
            }
            log.info('connection to mongodb is already made');
            return Promise.resolve();
        } catch (e) {
            log.error(e);
            return Promise.reject(e);
        }
    }
}

module.exports = MongooseConnector;
