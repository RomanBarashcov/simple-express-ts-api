


import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';
import { ImageTags } from './image.tags';
import { Tag } from './tag';

export class Image extends Model {

  public id!: number;
  public source!: string;
  public title!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

Image.init({
  source: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  title: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  description: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'images',
});

//Image.belongsToMany(Tag, { through: ImageTags });
//Image.hasMany(ImageTags);

Image.sync({ force: false }).then(() => console.log("Image model synced"));