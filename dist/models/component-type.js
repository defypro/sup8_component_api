"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../database/db");
const sequelize_1 = require("sequelize");
const db = db_1.sequelize();
class ComponentTypeModel extends sequelize_1.Model {
}
ComponentTypeModel.init({
    Id: {
        type: sequelize_1.DataTypes.STRING(32),
        primaryKey: true
    },
    title: sequelize_1.DataTypes.STRING(50),
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 't_sup8_h5_componenttype',
    sequelize: db,
});
exports.default = ComponentTypeModel;
