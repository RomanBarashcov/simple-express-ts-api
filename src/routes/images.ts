import { Router } from 'express';
import  ImageDao, { IImageDao } from '@daos/image/image.dao';
import { IImageService , ImageService } from '../service/image.service';
import { IImageController, ImageController } from 'src/controllers/image.controller';

class ImageRouter {

    private router: Router;
    private imageControler: IImageController;

    constructor() {

        this.router = Router();

        const imageDao: IImageDao = new ImageDao();
        const imageService: IImageService = new ImageService(imageDao);
        this.imageControler = new ImageController(imageService);

        this.setup();
    }

    private setup(): void {

        this.router.get('/all', async (req, res) => await this.imageControler.getAll(req,res));
        
        this.router.get('/:id', async (req, res) => await this.imageControler.getById(req,res));
        
        this.router.get('/find/by/title/:title', async (req, res) => await this.imageControler.getByTitle(req,res));
        
        this.router.post('/include/tags', async (req, res) => await this.imageControler.includeTags(req,res));
        
        this.router.post('/add', async (req, res) => await this.imageControler.create(req,res));
        
        this.router.post('/assign/tag', async (req, res) => await this.imageControler.assignTag(req,res));
        
        this.router.put('/update', async (req, res) => await this.imageControler.update(req,res));
        
        this.router.delete('/delete/:id', async (req, res) => await this.imageControler.delete(req,res));

    }

    public getRouter(): Router {

        return this.router;

    }

}

export default new ImageRouter().getRouter();