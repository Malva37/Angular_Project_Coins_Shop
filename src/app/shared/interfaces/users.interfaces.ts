export interface IUser{
    
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    address: string,
    password?: string;
    comment?:string;

}