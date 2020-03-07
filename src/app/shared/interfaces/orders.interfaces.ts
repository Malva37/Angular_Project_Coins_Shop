import { IUser } from './users.interfaces';
import { IArticle } from './articles.interfaces';
import { Article } from '../classes/articles.model';


export interface IOrder {
    id: string;
    user: IUser;
    article:Array<Article>;
    totalSumOrder:number,
    payment:string;
    delivery:string
}



