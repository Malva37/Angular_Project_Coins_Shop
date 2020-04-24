import { IProduct } from '../interfaces/products.interfaces';
import { IImage } from '../interfaces/image.interfaces';

export class Product implements IProduct{
    constructor(
        public id:number,
        public categoryId:number,
        public categoryName:string,
        public name:string,
        public count:number,
        public reserved:number,
        public isAvailable:boolean,
        public description:string,
        public price:number,
        public isVisibleForUsers:boolean,
        public images:Array<IImage>
){}



}