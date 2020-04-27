import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';
import { ImageTags } from './image.tags';
import { Image } from './image';

export class Tag extends Model {

  public id!: number;
  public name!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

Tag.init({
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'tag',
});

//Tag.belongsToMany(Image, { through: ImageTags, foreignKey: 'tagId' });
//Tag.hasMany(ImageTags);

Tag.sync({ force: false }).then(() => console.log("Tag model synced"));