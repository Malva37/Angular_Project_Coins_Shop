import { IProduct } from './products.interfaces';

export interface IBanknote extends IProduct {
    signature: string;
}