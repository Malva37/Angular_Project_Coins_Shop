
import { IMedal } from '../interfaces/medals.interfaces';

export class Medal implements IMedal {
    constructor(
        public id: number,
        public categoryId: number,
        public categoryName: string,
        public name: string,
        public description: string,
        public price: number,
        public image: any
    ) { }

}