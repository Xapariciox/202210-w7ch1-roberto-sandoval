import fs from 'fs/promises';
import { Sneaker } from '../interfaces/product';
import { Data, id } from './data.js';

export class SneakerFileData implements Data<Sneaker> {
    dataFileURL: string;
    constructor() {
        this.dataFileURL = 'src/server/products.json';
    }
    async getAll(): Promise<Array<Sneaker>> {
        return fs
            .readFile(this.dataFileURL, 'utf-8')
            .then((data) => JSON.parse(data).Product as Array<Sneaker>);
    }
    async get(id: id): Promise<Sneaker> {
        return fs.readFile(this.dataFileURL, 'utf-8').then((data) => {
            const aData = JSON.parse(data) as Array<Sneaker>;
            const item = aData.find((item) => item.name === name);
            if (!item) throw new Error();
            return item;
        });
    }
}
