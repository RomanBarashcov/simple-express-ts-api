import { Router } from 'express';
import UserDao from '@daos/user/user.dao';
import { IUserService , UserService } from '../service/user.service';
import { UserController, IUserController } from '../controllers/user.controller';

class UserRouter {

    private router: Router;
    private userController: IUserController;

    constructor() {

        this.router = Router();

        const userDao = new UserDao();
        const userService: IUserService = new UserService(userDao);
        this.userController = new UserController(userService);

        this.setup();

    }

    private setup(): void {

        this.router.get('/all', async (req, res) => await this.userController.getAllUsers(req,res));

        this.router.get('/:id', async (req, res) => await this.userController.getById(req,res));

        this.router.get('/find/by/email/:email', async (req, res) => await this.userController.getByEmail(req,res));

        this.router.get('/find/by/role/:id', async (req, res) => await this.userController.getByRole(req,res));

        this.router.post('/add', async (req, res) => await this.userController.create(req,res));

        this.router.put('/update', async (req, res) => await this.userController.update(req,res));

        this.router.delete('/delete/:id', async (req, res) => await this.userController.delete(req,res));

    }

    public getRouter(): Router {

        return this.router;

    }

}

export default new UserRouter().getRouter();
