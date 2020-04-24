import { IImage } from '../interfaces/image.interfaces';

export class Image implements IImage {
    constructor(
        public id: number,
        public url: string,
        public title: boolean
    ) { }



}