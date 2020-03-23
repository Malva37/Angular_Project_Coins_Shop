import { IUser } from '../interfaces/users.interfaces';

export class User implements IUser {

    constructor(

        public id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: string,
        public address: string,
        public password: string,
       public role:string
      

    ) { }

}