import { Request, Response } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import { paramMissingError } from '@shared/constants';
import { IImageService } from '../service/image.service';

export interface IImageController {

    getAll: (req: Request, res: Response) => Promise<any>;

    getById: (req: Request, res: Response) => Promise<any>;

    getByTitle: (req: Request, res: Response) => Promise<any>;

    includeTags: (req: Request, res: Response) => Promise<any>;

    create: (req: Request, res: Response) => Promise<any>;

    assignTag: (req: Request, res: Response) => Promise<any>;

    update: (req: Request, res: Response) => Promise<any>;

    delete: (req: Request, res: Response) => Promise<any>;

}

export class ImageController implements IImageController {

    private imageService: IImageService;

    public constructor(private _imServ: IImageService) {
        this.imageService = this._imServ;
    }

    public async getAll (req: Request, res: Response): Promise<any> {
        try {
    
            const images = await this.imageService.findAll();
            return res.status(OK).json({images});
    
        } catch (err) {
            return res.status(BAD_REQUEST).json({err});
        }
    }
    
    public async getById (req: Request, res: Response): Promise<any> {
        try {
    
            const { id } = req.params as ParamsDictionary;
            const image = await this.imageService.findOneById(Number(id));
            return res.status(OK).json({image});
    
        } catch (err) {
            return res.status(BAD_REQUEST).json({err});
        }
    }
    
    public async getByTitle (req: Request, res: Response): Promise<any> {
        try {
    
            const { title } = req.params as ParamsDictionary;
            const images = await this.imageService.findAllByTitle(title);
            return res.status(OK).json({images});
    
        } catch (err) {
            return res.status(BAD_REQUEST).json({err});
        }
    }
    
    public async includeTags (req: Request, res: Response): Promise<any> {
        try {
    
            const { tagIds } = req.body;
            const images = await this.imageService.findAllIncludeTags(tagIds);
            return res.status(OK).json({images});
    
        } catch (err) {
            return res.status(BAD_REQUEST).json({err});
        }
    }
    
    public async create (req: Request, res: Response): Promise<any> {
        try {
    
            const { image } = req.body;
            if (!image) {
                 return res.status(BAD_REQUEST).json({
                    error: paramMissingError,
                });
            }
        
            const result = await this.imageService.create(image);
            return res.status(CREATED).json({image: result});
    
        } catch (err) {
            return res.status(BAD_REQUEST).json({err});
        }
    }
    
    
    public async assignTag (req: Request, res: Response): Promise<any> {
        try {
    
            const { imageId, tagId } = req.body;
            if (!imageId || !tagId) {
                return res.status(BAD_REQUEST).json({
                    error: paramMissingError,
                });
            }
        
            const result = await this.imageService.assignTag(imageId, tagId);
            return res.status(CREATED).json({image: result});
    
        } catch (err) {
            return res.status(BAD_REQUEST).json({err});
        }
    };
    
    public async update (req: Request, res: Response): Promise<any> {
        try {
    
            const { image } = req.body;
            if (!image) {
                return res.status(BAD_REQUEST).json({
                    error: paramMissingError,
                });
            }
            
            const result = await this.imageService.update(image);
            return res.status(OK).json({image: result});
    
        } catch (err) {
            return res.status(BAD_REQUEST).json({err});
        }
    }
    
    public async delete (req: Request, res: Response): Promise<any> {
        try {
    
            const { id } = req.params as ParamsDictionary;
            const result = await this.imageService.delete(Number(id));
            return res.status(OK).json({image: result});
    
        } catch (err) {
            return res.status(BAD_REQUEST).json({err});
        }
    }

}