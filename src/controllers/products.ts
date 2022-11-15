import { NextFunction, Request, Response } from 'express';
import { Products } from '../interfaces/product.js';
import { Data, Data as DataModel } from '../data/data.js';
// import importData from '../server/products.json' assert { type: 'json' };

export class ProductsController {
    constructor(public dataModel: Data<Products>) {}

    async getAll(_req: Request, resp: Response) {
        const data = await this.dataModel.getAll();
        resp.json(data).end();
    }

    get(req: Request, resp: Response) {
        // data = data.filter((item) => item.id === +req.params.id);
        // resp.json(data);
        // resp.end();
    }
    async post(req: Request, resp: Response) {
        const newProduct = await this.dataModel.post(req.body);
        resp.json(newProduct).end();
    }
    patch(req: Request, resp: Response) {
        // const updateProduct = {
        //     ...data.find((item) => item.id === +req.params.id),
        //     ...req.body,
        // };
        // data[data.findIndex((item) => item.id === +req.params.id)] =
        //     updateProduct;
        // resp.json(updateProduct);
        // resp.end();
    }

    delete(req: Request, resp: Response, next: NextFunction) {
        //     if (!data.find((item) => item.id === +req.params.id)) {
        //         next(new Error('Not found'));
        //         return;
        //     }
        //     data = data.filter((item) => item.id !== +req.params.id);
        //     resp.json({});
        //     resp.end();
    }
}
