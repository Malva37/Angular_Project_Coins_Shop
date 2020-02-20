import { IProduct } from './products.interfaces';

export interface IBanknote extends IProduct {
    year:number;
    denomination:number;
    signature: string;
}