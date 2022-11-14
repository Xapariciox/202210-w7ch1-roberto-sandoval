import { NextFunction, Request, Response } from 'express';
import { Products } from '../interfaces/product.js';
import importData from '../server/products.json' assert { type: 'json' };
let data: Array<Products> = importData.Products;

export class ProductsController {
    getAll(_req: Request, resp: Response) {
        resp.json(data);
        resp.end();
    }

    get(req: Request, resp: Response) {
        data = data.filter((item) => item.id === +req.params.id);
        resp.json(data);
        resp.end();
    }
    post(req: Request, resp: Response) {
        const newProduct = {
            ...req.body,
            id: data.length + 1,
        };
        data.push(newProduct);
        resp.json(newProduct);
        resp.end();
    }
    patch(req: Request, resp: Response) {
        const updateProduct = {
            ...data.find((item) => item.id === +req.params.id),
            ...req.body,
        };
        data[data.findIndex((item) => item.id === +req.params.id)] =
            updateProduct;
        resp.json(updateProduct);
        resp.end();
    }

    delete(req: Request, resp: Response, next: NextFunction) {
        if (!data.find((item) => item.id === +req.params.id)) {
            next(new Error('Not found'));
            return;
        }
        data = data.filter((item) => item.id !== +req.params.id);
        resp.json({});
        resp.end();
    }
}
