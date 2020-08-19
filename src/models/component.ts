import {sequelize} from '../database/db'
import {DataTypes, Model} from "sequelize";
import ComponentTypeModel from './component-type'

const db = sequelize();

class ComponentModel extends Model {
}

ComponentModel.init({
    id: {
        type: DataTypes.STRING(32),
        primaryKey: true,
    },
    typeid: DataTypes.STRING(32),
    level: {
        type: DataTypes.STRING(2),
        defaultValue: '1',
    },
    sort: {
        type: DataTypes.DECIMAL,
        defaultValue: 1,
    },
    iconurl: {
        type: DataTypes.STRING,
        defaultValue: 'moduleArea_product'
    },
    name: DataTypes.STRING(50),
    description: DataTypes.STRING(200),
    componentviewname: DataTypes.STRING(50),
    componentpropviewname: DataTypes.STRING(50),
    SrcPath: DataTypes.STRING(255),
    ver: {
        type: DataTypes.STRING(20),
        defaultValue: '1.0.0',
        primaryKey: true
    },
    ROW_STATUS: {
        type: DataTypes.STRING(1),
        defaultValue: 'Y'
    },
    isdeleted: {
        type: DataTypes.STRING(1),
        defaultValue: 'N'
    },
    ComponentNo: {
        type: DataTypes.STRING(32),
        defaultValue: ''
    },
    ROW_CREATE_DATE: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    AuditStatus: {
        type: DataTypes.CHAR,
        defaultValue: '1',
    },
    ReleaseStatus: {
        type: DataTypes.CHAR,
        defaultValue: '1',
    },
    PublishH5Plus: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
    }
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 't_sup8_h5_basecomponents',
    sequelize: db,
});

ComponentModel.belongsTo(ComponentTypeModel, {foreignKey: 'typeid', targetKey: 'Id'});

export default ComponentModel;