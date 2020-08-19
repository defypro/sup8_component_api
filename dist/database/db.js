"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const defaultConfig = {
    database: 'supercarrier_masterdata',
    // database: 'testsupercarrier_masterdata',
    username: 'root',
    password: 'abc123.',
    host: '10.20.31.88',
    // host: '10.20.31.41',
    port: 3306,
};
const { database, username, password, host, port } = defaultConfig;
exports.sequelize = function () {
    return new sequelize_1.Sequelize(database, username, password, {
        dialect: 'mysql',
        host,
        port,
        quoteIdentifiers: true,
        timezone: '+08:00',
        logging: false
    });
};
