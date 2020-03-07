import { IOrder } from '../interfaces/orders.interfaces';
import { IUser } from '../interfaces/users.interfaces';
import { IArticle } from '../interfaces/articles.interfaces';
import { Article } from './articles.model';

export class Order implements IOrder{
    constructor(
       public id: string,
       public user: IUser,
       public  article:Array<Article>,
       public totalSumOrder:number,
       public  payment:string,
       public  delivery:string
    ){}
}