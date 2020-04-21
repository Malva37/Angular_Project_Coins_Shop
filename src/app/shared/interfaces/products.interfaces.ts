export interface IProduct{
    id:number;
    categoryId:number;
    categoryName:string;
    name:string;
    counter:number;
    reserved:number;
    isAvailable:boolean;
    description:string;
    price:number;
    images:Array<string>;
}