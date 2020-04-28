import { IImageDao } from '../daos/image/image.dao';
import { IImage } from '../entities/Image';

export interface IImageService {
    findOneById: (id: number) => Promise<IImage | null>;
    findAll: () => Promise<IImage[]>;
    findAllByTitle: (title: string) => Promise<IImage[] | []>;
    findAllIncludeTags: (ids: [number]) => Promise<IImage[] | []>;
    create: (image: IImage) => Promise<IImage>;
    assignTag: (imageId: number, tagId: number) => Promise<any>;
    update: (image: IImage) => Promise<any>;
    delete: (id: number) => Promise<any>;
}

export class ImageService implements IImageService {
    
    private imageDao: IImageDao; 

    constructor(private _iD: IImageDao) {
        this.imageDao = this._iD;
    }

    public async findOneById (id: number): Promise<IImage | null> {
        try {

            let image = await this.imageDao.getOneById(id);
            return image;

        } catch (err) {
            throw err;
        }
    }

    public async findAll (): Promise<IImage[]> {
        try {

            let images = await this.imageDao.getAll();
            return images;

        } catch (err) {
            throw err;
        }
    }

    public async findAllByTitle (title: string): Promise<IImage[] | []> {
        try {

            let images = await this.imageDao.getAllByTitle(title);
            return images;

        } catch (err) {
            throw err;
        }
    }

    public async findAllIncludeTags (ids: [number]): Promise<IImage[] | []> {
        try {

            let images = await this.imageDao.getAllIncludeTags(ids);
            return images;

        } catch (err) {
            throw err;
        }
    }

    public async create (image: IImage): Promise<IImage> {
        try {

            let result = await this.imageDao.add(image);
            return result;

        } catch (err) {
            throw err;
        }
    }

    public async assignTag (imageId: number, tagId: number): Promise<any> {
        try {

            let existTag = await this.imageDao.getOneTagById(tagId);
            if(!existTag) throw 'Incorrect tag id';

            let imageTags = await this.imageDao.getAllTagsByImage(imageId) as [];
            if(imageTags.find(t => t === tagId)) throw 'Tag assignet';

            let result = await this.imageDao.assignTag(imageId, tagId);
            return result;

        } catch (err) {
            throw err;
        }
    }

    public async update (image: IImage): Promise<any> {
        try {

            let result = await this.imageDao.update(image);
            return result;

        } catch (err) {
            throw err;
        }
    }

    public async delete (id: number): Promise<any> {
        try {

           return await this.imageDao.delete(id);

        } catch (err) {
            throw err;
        }
    }
    
}