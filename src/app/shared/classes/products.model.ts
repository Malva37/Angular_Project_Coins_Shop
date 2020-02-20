import { IProduct } from '../interfaces/products.interfaces';

export class Product implements IProduct{
    constructor(
        public id:number,
        public categoryId:number,
        public categoryName:string,
        public name:string,
        public description:string,
        public price:number,
        public image:any
){}



}