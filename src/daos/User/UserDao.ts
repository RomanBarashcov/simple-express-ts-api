import { IUser } from '@entities/User';
import { db } from '../../core/database/config/index';

export interface IUserDao {
    getOneByEmail: (email: string) => Promise<IUser | null>;
    getOneById: (id: number) => Promise<IUser | null>;
    getAll: () => Promise<IUser[]>;
    getAllByRoleId: (id: number) => Promise<IUser[]>;
    add: (user: IUser) => Promise<void>;
    update: (user: IUser) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class UserDao implements IUserDao {

    /**
     * @param email
     */
    public async getOneByEmail(email: string): Promise<IUser | null> {

        let user = await db.User.findOne({
            attributes: ['id', 'name', 'email'],
            include: [
                { model: db.Role, attributes: ['id', 'type'] }
            ],
            where: {email: email}
        });

        return user;
    }

     /**
     * @param id
     */
    public async getOneById(id: number): Promise<IUser | null> {

        let user = await db.User.findOne({
            attributes: ['id', 'name', 'email'],
            include: [
                { model: db.Role, attributes: ['id', 'type'] }
            ],
            where: {id: id}
        });

        return user;
    }

    /**
     *
     */
    public async getAll(): Promise<IUser[]> {

        let users = await db.User.findAll({
            attributes: ['id', 'name', 'email'],
            include: [
                { model: db.Role, attributes: ['id', 'type'] }
            ],
        });

        return users;
    }

     /**
     * @param id
     */
    public async getAllByRoleId(id: number): Promise<IUser[]> {

        let users = await db.User.findAll({
            attributes: ['id', 'name', 'email'],
            include: [
                { model: db.Role, 
                  attributes: ['id', 'type'],
                  where: {id: id}
                }
            ],
        });

        return users;
    }


    /**
     *
     * @param user
     */
    public async add(user: IUser): Promise<void> {
        // TODO
        return {} as any;
    }


    /**
     *
     * @param user
     */
    public async update(user: IUser): Promise<void> {
        // TODO
        return {} as any;
    }


    /**
     *
     * @param id
     */
    public async delete(id: number): Promise<void> {
        // TODO
        return {} as any;
    }
}

export default UserDao;
