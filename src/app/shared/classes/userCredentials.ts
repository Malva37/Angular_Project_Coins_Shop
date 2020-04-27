import { IUserCredentials } from '../interfaces/userCredentials.interfaces';

export class UserCredentials implements IUserCredentials {

    constructor(
        public userName: string,
        public password: string

    ) { }

}