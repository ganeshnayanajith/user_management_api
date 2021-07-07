/*
 *This is a initial script file for create the first admin user
 * */
'use strict';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const MongooseConnector = require('../lib/db/connectors/MongooseConnector');
const UserModel = require('../lib/db/models/user.model');
const Utils = require('../lib/Utils');

const run = async () => {
    try {
        await MongooseConnector.initialize();
        const user = {
            _id: "34d46a80-ddb4-11eb-ac3b-e952629395de",
            firstName: "keeneye",
            lastName: "solutions",
            email: "keeneyesolutions@gmail.com",
            password: "password",
            permissionLevel: "admin",
            createdBy: "34d46a80-ddb4-11eb-ac3b-e952629395de",
            updatedBy: "34d46a80-ddb4-11eb-ac3b-e952629395de"
        };
        user.password = Utils.getHash(user.password);
        const newUser = new UserModel(user);
        const result = await newUser.save();
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
};

run().then((res) => {
    console.log(res);
}).catch((err) => {
    console.error(err);
});