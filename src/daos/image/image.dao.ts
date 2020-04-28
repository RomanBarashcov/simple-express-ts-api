import { IImage } from '@entities/Image';
import { db } from '../../core/database/config/index';

export interface IImageDao {
    getOneById: (id: number) => Promise<IImage | null>;
    getAll: () => Promise<IImage[]>;
    getAllByTitle: (title: string) => Promise<IImage[] | []>;
    getAllIncludeTags: (ids: [number]) => Promise<IImage[] | []>;
    getOneTagById: (id: number) => Promise<any>;
    getAllTagsByImage: (id: number) => Promise<any>;
    add: (image: IImage) => Promise<IImage>;
    assignTag: (imageId: number, tagId: number) => Promise<any>;
    update: (image: IImage) => Promise<any>;
    delete: (id: number) => Promise<void>;
}

class ImageDao implements IImageDao {

    /**
     *
     * @param id
     */
    public async getOneById (id: number): Promise<IImage | null> {

        const image = await db.Image.findOne({
            attributes: ['id', 'source', 'title', 'description'],
            include: [{ 
                model: db.Tag, 
                attributes: ['id', 'name'],
                required: false,
                through: {
                    attributes: [] // exclude all attributes in ImageTags through table
                }
            }],
            where: { id: id } 
        });
        
        return image;
    }

    /**
     *
     *
     */
    public async getAll (): Promise<IImage[]> {

        const images = await db.Image.findAll();
        return images;

    }

    /**
     *
     *@param title
     */
    public async getAllByTitle (title: string): Promise<IImage[] | []> {

        const images = await db.Image.findAll({
            where: {title: title}
        });

        return images;
    }

    /**
     *
     *@param ids
     */
    public async getAllIncludeTags (ids: [number]): Promise<IImage[] | []> {

        let imageIds = await db.ImageTags.findAll({
            attributes: ['imageId'],
            where: { tagId: ids }
        });

        const images = await db.Image.findAll({
            include: [ { 
                model: db.Tag,
                attributes: ['id', 'name'],
                required: true,
                through: {
                    attributes: [], // exclude all attributes in ImageTags through table
                },
            }],
            where: { id: imageIds.map(i => i.imageId) }
        });

        return images;

    }

    /**
     *
     *@param id
     */
    public async getAllTagsByImage (id: number): Promise<any> {
        try {

            let imageTagIds = await db.ImageTags.findAll({
                attributes: ['tagId'],
                where: { imageId: id }
            });

            return imageTagIds.map(i => i.tagId);

        } catch (err) {
            throw err;
        }
    }

    /**
     *
     *@param id
     */
    public async getOneTagById (id: number): Promise<any> {

        const image = await db.Tag.findOne({where: {id: id}});
        return image;

    }

    /**
     *
     * @param title
     */
    public async getOneByTitle (title: string): Promise<IImage[] | []> {

        const images = await db.Image.findAll({where: { title: title } });
        return images;
    }

    /**
     *
     * @param image
     */
    public async add (image: IImage): Promise<IImage> {
        
        let result = await db.Image.create(image);
        return result;

    }

    /**
     *
     * @params imageId,tagId
     */
    public async assignTag (imageId: number, tagId: number): Promise<any> {
        
        let result = await db.ImageTags.create({imageId: imageId, tagId: tagId});
        return result;

    }

    /**
     *
     * @param image
     */
    public async update (image: IImage): Promise<any> {
        
        let result = await db.Image.update(image, { where: { id: image.id } });
        return result;

    }

    /**
     *
     * @param id
     */
    public async delete (id: number): Promise<any> {

        return await db.Image.destroy({ where: { id: id } });

    }

}

export default ImageDao;