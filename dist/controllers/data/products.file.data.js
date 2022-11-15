import fs from 'fs/promises';
// const dataFileURL = 'src/server/products.json';
export class ProductFileData {
    dataFileURL;
    constructor() {
        this.dataFileURL = 'src/server/products.json';
    }
    async getAll() {
        return fs
            .readFile(this.dataFileURL, 'utf-8')
            .then((data) => JSON.parse(data));
        // const data: Array<Products> = JSON.parse()
        // return data;
    }
}
