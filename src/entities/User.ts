export interface IUser {

    id: number;
    name: string;
    email: string;
    roleId: number;
    
}

class User implements IUser {

    public id: number;
    public name: string;
    public email: string;
    public roleId: number;

    constructor(nameOrUser: string | IUser, email?: string, id?: number, roleId?: number) {
        if (typeof nameOrUser === 'string') {
            this.name = nameOrUser;
            this.email = email || '';
            this.id = id || -1;
            this.roleId = roleId || -1;

        } else {
            this.name = nameOrUser.name;
            this.email = nameOrUser.email;
            this.id = nameOrUser.id;
            this.roleId = nameOrUser.roleId;
        }
    }
}

export default User;
