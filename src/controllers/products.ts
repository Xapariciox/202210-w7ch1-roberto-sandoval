import { NextFunction, Request, Response } from 'express';

import { Products } from '../interfaces/products';
import importData from '../server/products.json' assert { type: 'json' };
let data: Array<Products> = importData.Products;

export class ProductsController {
    getAll(req: Request, resp: Response) {
        resp.json(data);
        resp.end();
    }
}
