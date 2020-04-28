import { Router } from 'express';
import { UserRouter } from './users';
import ImageRouter from './images';

import UserDao from '@daos/user/user.dao';
import { IUserService , UserService } from '../service/user.service';
import { UserController, IUserController } from '../controllers/user.controller';

class RouterConfig {

    public router: Router;
    private userRouter: Router;

    constructor() {

        this.router = Router();

        const userDao = new UserDao();
        const userService: IUserService = new UserService(userDao); 
        const userController: IUserController = new UserController(userService);
        this.userRouter = new UserRouter(userController).getRouter();

        this.setupRouter();

    }

    private setupRouter(): void {
        this.router.use('/users', this.userRouter);
        this.router.use('/images', ImageRouter);
    }
}

export default new RouterConfig().router;
