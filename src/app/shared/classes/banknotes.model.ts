
import { IProduct } from '../interfaces/products.interfaces';

export class Banknote implements IProduct{
    constructor(
            public id:number,
            public categoryId:number,
            public categoryName:string,
            public name:string,
            public counter:number,
            public reserved:number,
            public isAvailable:boolean,
            public year:number,
            public denomination:number,
            public signature:string,
            public description:string,
            public price:number,
            public images: Array<string>
    ){}
}