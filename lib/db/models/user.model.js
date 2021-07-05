'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    permissionLevel: { type: String, required: true },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true }
}, { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } });

module.exports = mongoose.model('User', UserSchema, 'users');
