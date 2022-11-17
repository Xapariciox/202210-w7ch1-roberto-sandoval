import { NextFunction, Request, Response } from 'express';
import { Data } from '../data/data.js';
import { HTTPError } from '../interfaces/error.js';
import { Sneaker } from '../interfaces/product.js';

export class SneakersController {
    constructor(public repository: Data<Sneaker>) {}

    async getAll(_req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.repository.getAll();
            resp.json({ data });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable Sorry',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }

    async get(req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.repository.get(req.params.id);
            resp.json({ data });
        } catch (error) {
            next(this.#createHttpError(error as Error));
            return;
        }
    }
    async post(req: Request, resp: Response, next: NextFunction) {
        try {
            const newSneaker = await this.repository.post(req.body);
            resp.json({ newSneaker }).end();
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }
    async patch(req: Request, resp: Response, next: NextFunction) {
        try {
            const updateSneaker = await this.repository.patch(
                req.params.id,
                req.body
            );
            resp.json(updateSneaker);
        } catch (error) {
            next(this.#createHttpError);
        }
    }
    async delete(req: Request, resp: Response, next: NextFunction) {
        try {
            await this.repository.delete(req.params.id);
            resp.json({});
        } catch (error) {
            next(this.#createHttpError);
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
