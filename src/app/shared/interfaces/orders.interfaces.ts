import { IUser } from './users.interfaces';
import { IArticle } from './articles.interfaces';


export interface IOrder {
    id: string;
    user: IUser;
    article:Array<IArticle> 
}



