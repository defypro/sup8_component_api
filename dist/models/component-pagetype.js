"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../database/db");
const sequelize_1 = require("sequelize");
const db = db_1.sequelize();
class ComponentPageTypeModel extends sequelize_1.Model {
}
ComponentPageTypeModel.init({
    Id: {
        type: sequelize_1.DataTypes.STRING(32),
        primaryKey: true
    },
    PageType: {
        type: sequelize_1.DataTypes.STRING(32),
        defaultValue: "0"
    },
    basecompid: sequelize_1.DataTypes.STRING(32),
    ROW_STATUS: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1
    },
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 't_sup8_h5_pagetypeassbasecomponents',
    sequelize: db,
});
exports.default = ComponentPageTypeModel;
