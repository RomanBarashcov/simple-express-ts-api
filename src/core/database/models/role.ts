
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';
import { User } from './user';

export class Role extends Model {

  public id!: number;
  public type!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

Role.init({
  type: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'role',
});

//Role.hasMany(User, {foreignKey: 'roleId'});

Role.sync({ force: false }).then(() => console.log("Role table created"));