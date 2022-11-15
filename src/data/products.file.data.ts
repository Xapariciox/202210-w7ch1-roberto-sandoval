import { Products } from '../interfaces/product.js';
import { Data, id } from './data.js';

import fs from 'fs/promises';
// const dataFileURL = 'src/server/products.json';

export class ProductFileData implements Data<Products> {
    dataFileURL: string;
    constructor() {
        this.dataFileURL = 'src/server/products.json';
    }
    async getAll(): Promise<Array<Products>> {
        return fs
            .readFile(this.dataFileURL, 'utf-8')
            .then((data) => JSON.parse(data) as Array<Products>);
        // const data: Array<Products> = JSON.parse()
        // return data;
    }
    async get(id: id): Promise<Products> {
        return fs.readFile(this.dataFileURL, 'utf-8').then((data) => {
            const aData = JSON.parse(data) as Array<Products>;
            const item = aData.find((item) => item.id === id);
            if (!item) throw new Error();
            return item;
        });
    }

    async post(newProduct: Partial<Products>): Promise<Products> {
        const aData = await this.getAll();
        const finalProduct = {
            ...(newProduct as Products),
            id: this.#createID(),
        };
        aData.push(finalProduct);
        await this.#saveData(aData);
        return finalProduct;
    }

    async patch(
        id: number,
        updateProductData: Partial<Products>
    ): Promise<Products> {
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

    async delete(id:id): Promise<void>{
        const aData = await this.getAll()
        const index = aData.findIndex((item)=> item.id=== id)
        if(!index) throw new Error('Not found id')

        aData.filter((item) item!== id)
        
        
    }

    #createID() {
        return Math.trunc(Math.random() * 1_000_000_000);
    }
    #saveData(data: Array<Products>) {
        return fs.writeFile(this.dataFileURL, JSON.stringify(data));
    }
}
