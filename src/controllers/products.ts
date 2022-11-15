import { NextFunction, Request, Response } from 'express';
import { Products } from '../interfaces/product.js';
import { Data, Data as DataModel } from '../data/data.js';
import { HTTPError } from '../interfaces/error.js';

// import importData from '../server/products.json' assert { type: 'json' };

export class ProductsController {
    constructor(public dataModel: Data<Products>) {}

    async getAll(_req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.dataModel.getAll();
            resp.json(data).end();
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }

    get(req: Request, resp: Response) {
        // data = data.filter((item) => item.id === +req.params.id);
        // resp.json(data);
        // resp.end();
    }
    async post(req: Request, resp: Response, next: NextFunction) {
        if (!req.body.nombre) {
            const httpError = new HTTPError(
                503,
                'service not available',
                'nombre not included in the data'
            );
            next(HTTPError);
            return;
        }
        try {
            const newProduct = await this.dataModel.post(req.body);
            resp.json(newProduct).end();
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'service unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }
    async patch(req: Request, resp: Response, next: NextFunction) {
        try {
            const updateProduct = await this.dataModel.patch(
                +req.params.id,
                req.body
            );
            resp.json(updateProduct).end();
        } catch (error) {
            if ((error as Error).message === 'Not found id') {
                const httpError = new HTTPError(
                    404,
                    'Not Found',
                    (error as Error).message
                );
                next(httpError);
                return;
            }
        }
    }
    async delete(req: Request, resp: Response, next: NextFunction) {
        try {
            await this.dataModel.delete(+req.params.id);
            resp.json({}).end();
        } catch (error) {
            if ((error as Error).message === 'Not found id') {
                const httpError = new HTTPError(
                    404,
                    'Not Found',
                    (error as Error).message
                );
                next(httpError);
                return;
            }
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }
}
