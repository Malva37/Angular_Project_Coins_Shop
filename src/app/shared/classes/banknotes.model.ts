
import { IProduct } from '../interfaces/products.interfaces';

export class Banknote implements IProduct{
    constructor(
            public id:string,
            public categoryId:number,
            public categoryName:string,
            public name:string,
            public counter:number,
            public year:number,
            public denomination:number,
            public signature:string,
            public description:string,
            public price:number,
            public image: any
    ){}
}