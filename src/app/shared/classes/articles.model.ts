import { IArticle } from '../interfaces/articles.interfaces';
import { IProduct } from '../interfaces/products.interfaces';

export class Article implements IArticle {
    constructor(
        public id: number,
        public article: IProduct,
        public counter: number,
        public currentPrice: number,
        public totalSum: number,
    ) { }



}