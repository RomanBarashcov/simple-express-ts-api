import { IUserDao } from '../daos/user/user.dao';

export interface IUserService {

    getAll(): Promise<any>;

    getById(id: number): Promise<any>;

    getByRoleId(id: number): Promise<any>;

    getByEmail(email: string): Promise<any>;

    createUser(user: any): Promise<any>;

    updateUser(user: any): Promise<any>;

    deleteUser(id: number): Promise<any>;
    
}

export class UserService implements IUserService {
    
    private userDao: IUserDao; 

    constructor(private _uD: IUserDao) {
        this.userDao = this._uD;
    }

    public async getAll(): Promise<any> {
        try {

            return await this.userDao.getAll();

        } catch (err) {
            throw err;
        }
    };

    public async getByRoleId(id: number): Promise<any> {
        try {

            return await this.userDao.getAllByRoleId(id);

        } catch (err) {
            throw err;
        }
    }

    public async getById(id: number): Promise<any> {
        try {

            return await this.userDao.getOneById(id);

        } catch (err) {
            throw err;
        }
    };

    public async getByEmail(email: string): Promise<any> {
        try {

            return await this.userDao.getOneByEmail(email);

        } catch (err) {
            throw err;
        }
    };

    public async createUser(user: any): Promise<any> {
        try {

            return await this.userDao.add(user);

        } catch (err) {
            throw err;
        }
    };

    public async updateUser(user: any): Promise<any> {
        try {

            return await this.userDao.update(user);

        } catch (err) {
            throw err;
        }
    };

    public async deleteUser(id: number): Promise<any> {
        try {

            return await this.userDao.delete(id);

        } catch (err) {
            throw err;
        }
    }


}