import { IProductOrder } from '../interfaces/productOrder.interfaces';

export class ProductOrder implements IProductOrder {
    constructor(
        public id: string,
        public categoryId: number,
        public name: string,
        public image:string,
        public price: number,
        public count: number,
        public amount: number

    ) { }
}