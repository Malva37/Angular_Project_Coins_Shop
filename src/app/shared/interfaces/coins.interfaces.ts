import { IProduct } from './products.interfaces';

export interface ICoin extends IProduct {
    year:number;
    denomination:number;
    series: string;
    metal: string
    imageReverse:any;

}