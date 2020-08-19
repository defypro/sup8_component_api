import {sequelize} from '../database/db'
import {DataTypes, Model} from "sequelize";
import ComponentTypeModel from './component-type'

const db = sequelize();

class ComponentPageTypeModel extends Model {
}

ComponentPageTypeModel.init({
    Id: {
        type: DataTypes.STRING(32),
        primaryKey: true
    },
    PageType: {
        type: DataTypes.STRING(32),
        defaultValue: "0"
    },
    basecompid: DataTypes.STRING(32),
    ROW_STATUS: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 't_sup8_h5_pagetypeassbasecomponents',
    sequelize: db,
});

export default ComponentPageTypeModel;