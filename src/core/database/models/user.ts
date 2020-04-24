
import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import * as sequelize from './index';
import * as Role from './role';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public roleId!: number;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  roleId: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  tableName: 'Users',
  sequelize: sequelize.default.sequelize,
});

User.belongsTo(Role.default, {targetKey: 'id'});

export default User;