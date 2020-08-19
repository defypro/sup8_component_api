import {sequelize} from '../database/db'
import {DataTypes, Model} from "sequelize";

const db = sequelize();

class ComponentTypeModel extends Model {
}

ComponentTypeModel.init({
    Id: {
        type: DataTypes.STRING(32),
        primaryKey: true
    },
    title: DataTypes.STRING(50),
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 't_sup8_h5_componenttype',
    sequelize: db,
});

export default ComponentTypeModel;