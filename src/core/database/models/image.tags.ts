import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';
import { Image } from './image';
import { Tag } from './tag';

export class ImageTags extends Model {

  public id!: number;
  public imageId!: number;
  public tagId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

ImageTags.init({
  imageId: {
    allowNull: false,
    type: new DataTypes.INTEGER,
    onDelete: 'CASCADE',
    validate: {
      notEmpty: true
    },

    references: {
      model: Image,
      key: 'id',
    }
  },
  tagId: {
    allowNull: false,
    type: new DataTypes.INTEGER,
    onDelete: 'CASCADE',
    validate: {
      notEmpty: true
    },

    references: {
      model: Tag,
      key: 'id',
    }
  },
}, {
  sequelize,
  modelName: 'image_tags',
});

ImageTags.sync({ force: false }).then(() => console.log("ImageTags model synced"));