import { HTTPError } from '../interfaces/error.js';
import { NextFunction, Request, Response } from 'express';
import { Data } from '../data/data';
import { Sneaker } from '../interfaces/product';

export class SneakersController {
    constructor(public dataModel: Data<Sneaker>) {}

    async getAll(req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.dataModel.getAll();
            resp.json(data).end();
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'service unavailable Sorry',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }
    async get(req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.dataModel.get(+req.params.id);
            resp.json(data);
        } catch (error) {
            next(this.#createHttpError(error as Error));
            return;
        }
    }

    async post(req: Request, resp: Response, next: NextFunction) {
        if (!req.body.name) {
            const httpError = new HTTPError(
                503,
                'service not available',
                'nombre not included in the data'
            );
            return;
        }
        try {
            const newSneaker = await this.dataModel.post(req.body);
            resp.json(newSneaker).end();
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
            const updateSneaker = await this.dataModel.patch(
                +req.params.id,
                req.body
            );
            resp.json(updateSneaker).end();
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

    #createHttpError(error: Error) {
        if ((error as Error).message === 'Not found id') {
            const httpError = new HTTPError(
                404,
                'Not Found',
                (error as Error).message
            );
            return httpError;
        }
        const httpError = new HTTPError(
            503,
            'Service unavailable',
            (error as Error).message
        );
        return httpError;
    }
}
