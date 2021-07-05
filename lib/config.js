'use strict';
const path = require('path');
const yaml_config = require('node-yaml-config');
const fileName = 'common.yml';
const config = yaml_config.load(path.join(__dirname, `../config/${fileName}`));

module.exports = config;
