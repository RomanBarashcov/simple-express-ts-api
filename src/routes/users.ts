import { Router } from 'express';
import { IUserController } from '../controllers/user.controller';

export class UserRouter {

    private router: Router;
    private userController: IUserController;

    constructor(private _uCon: IUserController) {

        this.router = Router();
        this.userController = this._uCon;
        this.setup();

    }

    private setup(): void {

        this.router.route('/all').get(this.userController.getAllUsers);

        /*this.router.get('/:id', this.userController.getById);

        this.router.get('/find/by/email/:email', this.userController.getByEmail);

        this.router.get('/find/by/role/:id', this.userController.getByRole);

        this.router.post('/add', this.userController.create);

        this.router.put('/update', this.userController.update);

        this.router.delete('/delete/:id', this.userController.delete); */

    }

    public getRouter(): Router {

        return this.router;

    }

}
