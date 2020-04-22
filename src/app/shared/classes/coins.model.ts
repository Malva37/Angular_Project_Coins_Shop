import { ICoin } from '../interfaces/coins.interfaces';

export class Coin implements ICoin{
    constructor(
            public id:number,
            public categoryId:number,
            public categoryName:string,
            public name:string,
            public count:number,
            public reserved:number,
            public isAvailable:boolean,
            public series:string,
            public year:number,
            public metal:string,
            public denomination:number,
            public description:string,
            public price:number,
            public images:Array<string>
            // public imageReverse:any
    ){}
}