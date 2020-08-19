"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../database/db");
const sequelize_1 = require("sequelize");
const db = db_1.sequelize();
class EnterpriseModel extends sequelize_1.Model {
}
EnterpriseModel.init({
    ID: {
        type: sequelize_1.DataTypes.STRING(32),
        primaryKey: true
    },
    enterpriseno: sequelize_1.DataTypes.STRING(12),
    name: sequelize_1.DataTypes.STRING(120),
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 't_sup8_cc_enterprisenumber',
    sequelize: db,
});
exports.default = EnterpriseModel;
