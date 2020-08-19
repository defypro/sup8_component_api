"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../database/db");
const sequelize_1 = require("sequelize");
const component_type_1 = __importDefault(require("./component-type"));
const db = db_1.sequelize();
class ComponentModel extends sequelize_1.Model {
}
ComponentModel.init({
    id: {
        type: sequelize_1.DataTypes.STRING(32),
        primaryKey: true,
    },
    typeid: sequelize_1.DataTypes.STRING(32),
    level: {
        type: sequelize_1.DataTypes.STRING(2),
        defaultValue: '1',
    },
    sort: {
        type: sequelize_1.DataTypes.DECIMAL,
        defaultValue: 1,
    },
    iconurl: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'moduleArea_product'
    },
    name: sequelize_1.DataTypes.STRING(50),
    description: sequelize_1.DataTypes.STRING(200),
    componentviewname: sequelize_1.DataTypes.STRING(50),
    componentpropviewname: sequelize_1.DataTypes.STRING(50),
    SrcPath: sequelize_1.DataTypes.STRING(255),
    ver: {
        type: sequelize_1.DataTypes.STRING(20),
        defaultValue: '1.0.0',
        primaryKey: true
    },
    ROW_STATUS: {
        type: sequelize_1.DataTypes.STRING(1),
        defaultValue: 'Y'
    },
    isdeleted: {
        type: sequelize_1.DataTypes.STRING(1),
        defaultValue: 'N'
    },
    ComponentNo: {
        type: sequelize_1.DataTypes.STRING(32),
        defaultValue: ''
    },
    ROW_CREATE_DATE: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: new Date()
    },
    AuditStatus: {
        type: sequelize_1.DataTypes.CHAR,
        defaultValue: '1',
    },
    ReleaseStatus: {
        type: sequelize_1.DataTypes.CHAR,
        defaultValue: '1',
    },
    PublishH5Plus: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1,
    }
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 't_sup8_h5_basecomponents',
    sequelize: db,
});
ComponentModel.belongsTo(component_type_1.default, { foreignKey: 'typeid', targetKey: 'Id' });
exports.default = ComponentModel;
