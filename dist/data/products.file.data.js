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
    async get(id) {
        return fs.readFile(this.dataFileURL, 'utf-8').then((data) => {
            const aData = JSON.parse(data);
            const item = aData.find((item) => item.id === id);
            if (!item)
                throw new Error();
            return item;
        });
    }
    async post(newProduct) {
        const aData = await this.getAll();
        const finalProduct = {
            ...newProduct,
            id: this.#createID(),
        };
        aData.push(finalProduct);
        await this.#saveData(aData);
        return finalProduct;
    }
    #createID() {
        return Math.trunc(Math.random() * 1_000_000_000);
    }
    #saveData(data) {
        return fs.writeFile(this.dataFileURL, JSON.stringify(data));
    }
}
