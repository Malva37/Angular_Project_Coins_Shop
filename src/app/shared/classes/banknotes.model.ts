
import { IProduct } from '../interfaces/products.interfaces';

export class Banknote implements IProduct{
    constructor(
            public id:number,
            public categoryId:number,
            public categoryName:string,
            public name:string,
            public year:number,
            public denomination:number,
            public signature:string,
            public description:string,
            public price:number,
            public image: any
    ){}
}