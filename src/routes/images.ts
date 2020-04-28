import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import  ImageDao from '@daos/image/image.dao';
import { paramMissingError } from '@shared/constants';
import { IImageService , ImageService } from '../service/image.service';

const router = Router();
const imageDao = new ImageDao();
const imageService: IImageService = new ImageService(imageDao); 

router.get('/all', async (req: Request, res: Response) => {
    try {

        const images = await imageService.findAll();
        return res.status(OK).json({images});

    } catch (err) {
        return res.status(BAD_REQUEST).json({err});
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {

        const { id } = req.params as ParamsDictionary;
        const image = await imageService.findOneById(Number(id));
        return res.status(OK).json({image});

    } catch (err) {
        return res.status(BAD_REQUEST).json({err});
    }
});

router.get('/find/by/title/:title', async (req: Request, res: Response) => {
    try {

        const { title } = req.params as ParamsDictionary;
        const images = await imageService.findAllByTitle(title);
        return res.status(OK).json({images});

    } catch (err) {
        return res.status(BAD_REQUEST).json({err});
    }
});

router.post('/include/tags', async (req: Request, res: Response) => {
    try {

        const { tagIds } = req.body;
        const images = await imageService.findAllIncludeTags(tagIds);
        return res.status(OK).json({images});

    } catch (err) {
        return res.status(BAD_REQUEST).json({err});
    }
});

router.post('/add', async (req: Request, res: Response) => {
    try {

        const { image } = req.body;
        if (!image) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
    
        const result = await imageService.create(image);
        return res.status(CREATED).json({image: result});

    } catch (err) {
        return res.status(BAD_REQUEST).json({err});
    }
});

router.post('/assign/tag', async (req: Request, res: Response) => {
    try {

        const { imageId, tagId } = req.body;
        if (!imageId || !tagId) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
    
        const result = await imageService.assignTag(imageId, tagId);
        return res.status(CREATED).json({image: result});

    } catch (err) {
        return res.status(BAD_REQUEST).json({err});
    }
});

router.put('/update', async (req: Request, res: Response) => {
    try {

        const { image } = req.body;
        if (!image) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        
        const result = await imageService.update(image);
        return res.status(OK).json({image: result});

    } catch (err) {
        return res.status(BAD_REQUEST).json({err});
    }
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
    try {

        const { id } = req.params as ParamsDictionary;
        const result = await imageService.delete(Number(id));
        return res.status(OK).json({image: result});

    } catch (err) {
        return res.status(BAD_REQUEST).json({err});
    }
});


export default router;