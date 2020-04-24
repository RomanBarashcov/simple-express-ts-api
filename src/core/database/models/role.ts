
import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import * as sequelize from './index';

class Role extends Model {
  public id!: number;
  public type!: number;
}

Role.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  tableName: 'Roles',
  sequelize: sequelize.default.sequelize,
});

export default Role;