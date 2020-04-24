import { IImage } from './image.interfaces';

export interface IProduct {
    id: number;
    categoryId: number;
    categoryName: string;
    name: string;
    count: number;
    reserved: number;
    isAvailable: boolean;
    description: string;
    price: number;
    isVisibleForUsers: boolean;
    images: Array<IImage>;
}