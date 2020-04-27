import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import UserDao from '@daos/user/user.dao';
import { paramMissingError } from '@shared/constants';
import { IUserService , UserService } from '../service/user.service';

const router = Router();
const userDao = new UserDao();
const userService: IUserService = new UserService(userDao); 

router.get('/all', async (req: Request, res: Response) => {

    const users = await userService.getAll();
    return res.status(OK).json({users});

});

router.get('/:id', async (req: Request, res: Response) => {

    const { id } = req.params as ParamsDictionary;
    const users = await userService.getById(Number(id));
    return res.status(OK).json({users});

});

router.get('/find/by/email/:email', async (req: Request, res: Response) => {

    const { email } = req.params as ParamsDictionary;
    const users = await userService.getByEmail(email);
    return res.status(OK).json({users});

});

router.get('/find/by/role/:id', async (req: Request, res: Response) => {

    const { id } = req.params as ParamsDictionary;
    const users = await userService.getByRoleId(Number(id));
    return res.status(OK).json({users});

});


router.post('/add', async (req: Request, res: Response) => {

    const { user } = req.body;

    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

    let result = await userService.createUser(user);
    return res.status(CREATED).json({user: result});

});


router.put('/update', async (req: Request, res: Response) => {

    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

    user.id = Number(user.id);
    let result = await userService.updateUser(user);

    return res.status(OK).json({user: result});

});


router.delete('/delete/:id', async (req: Request, res: Response) => {

    const { id } = req.params as ParamsDictionary;
    await userDao.delete(Number(id));
    return res.status(OK).end();

});


export default router;
