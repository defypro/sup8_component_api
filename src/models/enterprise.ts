import {sequelize} from '../database/db'
import {DataTypes, Model} from "sequelize";

const db = sequelize();

class EnterpriseModel extends Model {
}

EnterpriseModel.init({
    ID: {
        type: DataTypes.STRING(32),
        primaryKey: true
    },
    enterpriseno: DataTypes.STRING(12),
    name: DataTypes.STRING(120),
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 't_sup8_cc_enterprisenumber',
    sequelize: db,
});

export default EnterpriseModel;