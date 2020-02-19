import { ICategory } from '../interfaces/categories.interfaces';



export class Category implements ICategory{
    constructor(
            public id:number,
            public name:string,

    ){}
}