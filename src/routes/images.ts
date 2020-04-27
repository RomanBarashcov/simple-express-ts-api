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

    const images = await imageService.findAll();
    return res.status(OK).json({images});

});

router.get('/:id', async (req: Request, res: Response) => {

    const { id } = req.params as ParamsDictionary;
    const image = await imageService.findOneById(Number(id));
    return res.status(OK).json({image});

});

router.get('/find/by/title/:title', async (req: Request, res: Response) => {

    const { title } = req.params as ParamsDictionary;
    const images = await imageService.findAllByTitle(title);
    return res.status(OK).json({images});

});

router.post('/find/by/tags', async (req: Request, res: Response) => {

    const { tagIds } = req.body;
    const images = await imageService.findAllByTags(tagIds);
    return res.status(OK).json({images});

});

router.post('/add', async (req: Request, res: Response) => {

    const { image } = req.body;
    const result = await imageService.create(image);
    return res.status(OK).json({image: result});

});

router.post('/assign/tag', async (req: Request, res: Response) => {

    const { imageId, tagId } = req.body;
    const result = await imageService.assignTag(imageId, tagId);
    return res.status(OK).json({image: result});

});

router.put('/update', async (req: Request, res: Response) => {

    const { image } = req.body;
    const result = await imageService.update(image);
    return res.status(OK).json({image: result});

});

router.delete('/delete/:id', async (req: Request, res: Response) => {

    const { id } = req.params as ParamsDictionary;
    const result = await imageService.delete(Number(id));
    return res.status(OK).json({image: result});

});


export default router;