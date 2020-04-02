
import { IMedal } from '../interfaces/medals.interfaces';

export class Medal implements IMedal {
    constructor(
        public id: string,
        public categoryId: number,
        public categoryName: string,
        public name: string,
        public counter:number,
        public reserved:number,
        public isAvailable:boolean,
        public description: string,
        public price: number,
        public image: string
    ) { }

}