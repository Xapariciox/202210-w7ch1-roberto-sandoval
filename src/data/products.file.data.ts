import { Product } from '../interfaces/product.js';
import { Data, id } from './data.js';

import fs from 'fs/promises';

export class ProductFileData implements Data<Product> {
    dataFileURL: string;
    constructor() {
        this.dataFileURL = 'src/server/products.json';
    }
    async getAll(): Promise<Array<Product>> {
        return fs
            .readFile(this.dataFileURL, 'utf-8')
            .then((data) => JSON.parse(data).Products as Array<Product>);
    }
    async get(id: id): Promise<Product> {
        return fs.readFile(this.dataFileURL, 'utf-8').then((data) => {
            const aData = JSON.parse(data) as Array<Product>;
            const item = aData.find((item) => item.id === id);
            if (!item) throw new Error();
            return item;
        });
    }

    async post(newProduct: Partial<Product>): Promise<Product> {
        const aData = await this.getAll();
        const finalProduct = {
            ...(newProduct as Product),
            id: this.#createID(),
        };
        aData.push(finalProduct);
        await this.#saveData(aData);
        return finalProduct;
    }

    async patch(
        id: number,
        updateProductData: Partial<Product>
    ): Promise<Product> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('not found id');
        aData[index] = {
            ...aData[index],
            ...updateProductData,
        };
        await this.#saveData(aData);
        return aData[index];
    }

    async delete(id: id): Promise<void> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('Not found id');
        aData.filter((item) => item.id !== id);
        await this.#saveData(aData);
    }

    #createID() {
        return Math.trunc(Math.random() * 1_000_000_000);
    }
    #saveData(data: Array<Product>) {
        return fs.writeFile(this.dataFileURL, JSON.stringify(data));
    }
}
