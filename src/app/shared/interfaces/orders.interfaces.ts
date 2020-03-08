import { ProductOrder } from '../classes/productOrder.model';


export interface IOrder {
    id: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string,
        comment: string;
    };
    items: Array<ProductOrder>;
    totalSumOrder: number,
    payment: string;
    delivery: string
}



