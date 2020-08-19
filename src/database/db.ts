import {Sequelize} from 'sequelize'

const defaultConfig = {
    database: 'supercarrier_masterdata',
    // database: 'testsupercarrier_masterdata',
    username: 'root',
    password: 'abc123.',
    host: '10.20.31.88',
    // host: '10.20.31.41',
    port: 3306,
};
const {database, username, password, host, port} = defaultConfig;

export const sequelize = function () {
    return new Sequelize(
        database,
        username,
        password,
        {
            dialect: 'mysql',
            host,
            port,
            quoteIdentifiers: true,
            timezone: '+08:00',
            logging: false
        }
    );
};