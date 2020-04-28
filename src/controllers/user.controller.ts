import { Request, Response } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import { paramMissingError } from '@shared/constants';
import { IUserService } from '../service/user.service';

export interface IUserController {

    getAllUsers: (req: Request, res: Response) => Promise<any>;

    getById: (req: Request, res: Response) => Promise<any>;

    getByEmail: (req: Request, res: Response) => Promise<any>;

    getByRole: (req: Request, res: Response) => Promise<any>;

    create: (req: Request, res: Response) => Promise<any>;

    update: (req: Request, res: Response) => Promise<any>;

    delete: (req: Request, res: Response) => Promise<any>;
    
}

export class UserController implements IUserController {

    private userService: IUserService;

    constructor(private _uSer: IUserService) {
        this.userService = this._uSer;
    }

    public async getAllUsers (req: Request, res: Response): Promise<any> {
        try {

            const users = await this.userService.getAll();
            return res.status(OK).json({users});

        } catch (err) {
            return res.status(BAD_REQUEST).json({err});
        }
    }

    public async getById (req: Request, res: Response): Promise<any> {
        try {

            const { id } = req.params as ParamsDictionary;
            const user = await this.userService.getById(Number(id));
            return res.status(OK).json({user});
    
        } catch (err) {
            return res.status(BAD_REQUEST).json({err});
        }
    }

    /*public async findByTitle(req: Request, res: Response): Promise<any> {
        try {

            const { title } = req.params as ParamsDictionary;
            const images = await this.imageService.findAllByTitle(title);
            return res.status(OK).json({images});
    
        } catch (err) {
            return res.status(BAD_REQUEST).json({err});
        }
    } */

    public async getByEmail (req: Request, res: Response): Promise<any> {
        try {
    
            const { email } = req.params as ParamsDictionary;
            const users = await this.userService.getByEmail(email);
            return res.status(OK).json({users});
    
        } catch (err) {
            return res.status(BAD_REQUEST).json({err});
        }
    }
    
    public async getByRole (req: Request, res: Response): Promise<any> {
        try {
    
            const { id } = req.params as ParamsDictionary;
            const users = await this.userService.getByRoleId(Number(id));
            return res.status(OK).json({users});
    
        } catch (err) {
            return res.status(BAD_REQUEST).json({err});
        }
    }
    
    
    public async create (req: Request, res: Response): Promise<any> {
        try {
    
            const { user } = req.body;
    
            if (!user) {
                return res.status(BAD_REQUEST).json({
                    error: paramMissingError,
                });
            }
        
            let result = await this.userService.createUser(user);
            return res.status(CREATED).json({user: result});
    
        } catch (err) {
            return res.status(BAD_REQUEST).json({err});
        }
    }
    
    
    public async update (req: Request, res: Response): Promise<any> {
        try {
    
            const { user } = req.body;
            if (!user) {
                return res.status(BAD_REQUEST).json({
                    error: paramMissingError,
                });
            }
        
            user.id = Number(user.id);
            let result = await this.userService.updateUser(user);
        
            return res.status(OK).json({user: result});
    
        } catch (err) {
            return res.status(BAD_REQUEST).json({err});
        }
    }
    
    
    public async delete (req: Request, res: Response): Promise<any> {
        try {
    
            const { id } = req.params as ParamsDictionary;
            const result = await this.userService.deleteUser(Number(id));
            return res.status(OK).json({result});
    
        } catch (err) {
            return res.status(BAD_REQUEST).json({err});
        }
    }

}

