
import { Product } from '../classes/products.model';
import { IProduct } from './products.interfaces';

export interface IArticle {
    id:number;
    article: IProduct;
    counter: number;
    currentPrice: number;
    totalSum:number;
}