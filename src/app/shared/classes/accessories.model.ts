
import { IAccessory } from '../interfaces/accessories.interfaces';

export class Accessory implements IAccessory {
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