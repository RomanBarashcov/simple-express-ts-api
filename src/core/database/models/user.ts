
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';
import { Role } from './role';

export class User extends Model {
  
  public id!: number;
  public name!: string;
  public email!: string;
  public roleId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

User.init({
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'user',
});

User.belongsTo(Role, {foreignKey: 'roleId'});

User.sync({ force: false }).then(() => console.log("User model synced"));
