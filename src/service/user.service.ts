import { IUserDao } from '../daos/User/UserDao';

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
        return await this.userDao.getAll();
    };

    public async getByRoleId(id: number): Promise<any> {
        return await this.userDao.getAllByRoleId(id);
    }

    public async getById(id: number): Promise<any> {
        return await this.userDao.getOneById(id);
    };

    public async getByEmail(email: string): Promise<any> {
       return await this.userDao.getOneByEmail(email);
    };

    public async createUser(user: any): Promise<any> {
        return await this.userDao.add(user);
    };

    public async updateUser(user: any): Promise<any> {
        return await this.userDao.update(user);
    };

    public async deleteUser(id: number): Promise<any> {
        return await this.userDao.delete(id);
    }


}