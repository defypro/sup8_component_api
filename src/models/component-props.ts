import {sequelize} from '../database/db'
import {DataTypes, Model} from "sequelize";
import ComponentModel from "./component";

const db = sequelize();

class ComponentPropsModel extends Model {
}

ComponentPropsModel.init({
    Id: {
        type: DataTypes.STRING(32),
        primaryKey: true
    },
    componentid: DataTypes.STRING(32),
    Propkey: DataTypes.STRING(50),
    title: DataTypes.STRING(50),
    inputtype: DataTypes.STRING(50),
    level: {
        type: DataTypes.STRING(2),
        defaultValue: '1',
    },
    sort: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    ROW_STATUS: {
        type: DataTypes.STRING(1),
        defaultValue: 'Y'
    },
    ROW_VER: {
        type: DataTypes.STRING(20),
        defaultValue: '1.0.0',
    },
    BUNDLEVER: {
        type: DataTypes.STRING(20),
        defaultValue: '1.0.0',
        primaryKey: true
    },
    ROW_CREATE_DATE: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    ROW_UPDATE_DATE: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 't_sup8_h5_basecomponentprops',
    sequelize: db,
});

ComponentPropsModel.belongsTo(ComponentModel, {foreignKey: 'componentid', targetKey: 'id'});

export default ComponentPropsModel;