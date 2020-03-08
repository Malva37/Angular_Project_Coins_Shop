import { IOrder } from '../interfaces/orders.interfaces';
import { Article } from './articles.model';
import { ProductOrder } from './productOrder.model';

export class Order implements IOrder{
    constructor(
       public id: string,
       public user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string,
        comment:string;
       },
       public  items:Array<ProductOrder>,
       public totalSumOrder:number,
       public  payment:string,
       public  delivery:string
    ){}
}