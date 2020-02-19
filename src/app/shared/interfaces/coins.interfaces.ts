import { IProduct } from './products.interfaces';

export interface ICoin extends IProduct {
    series: string;
    metal: string
}