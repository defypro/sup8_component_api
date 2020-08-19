"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../database/db");
const sequelize_1 = require("sequelize");
const component_1 = __importDefault(require("./component"));
const db = db_1.sequelize();
class ComponentPropsModel extends sequelize_1.Model {
}
ComponentPropsModel.init({
    Id: {
        type: sequelize_1.DataTypes.STRING(32),
        primaryKey: true
    },
    componentid: sequelize_1.DataTypes.STRING(32),
    Propkey: sequelize_1.DataTypes.STRING(50),
    title: sequelize_1.DataTypes.STRING(50),
    inputtype: sequelize_1.DataTypes.STRING(50),
    level: {
        type: sequelize_1.DataTypes.STRING(2),
        defaultValue: '1',
    },
    sort: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
    },
    ROW_STATUS: {
        type: sequelize_1.DataTypes.STRING(1),
        defaultValue: 'Y'
    },
    ROW_VER: {
        type: sequelize_1.DataTypes.STRING(20),
        defaultValue: '1.0.0',
    },
    BUNDLEVER: {
        type: sequelize_1.DataTypes.STRING(20),
        defaultValue: '1.0.0',
        primaryKey: true
    },
    ROW_CREATE_DATE: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: new Date()
    },
    ROW_UPDATE_DATE: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: new Date()
    },
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 't_sup8_h5_basecomponentprops',
    sequelize: db,
});
ComponentPropsModel.belongsTo(component_1.default, { foreignKey: 'componentid', targetKey: 'id' });
exports.default = ComponentPropsModel;
