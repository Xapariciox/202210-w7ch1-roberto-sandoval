import { HTTPError } from '../interfaces/error.js';
// import importData from '../server/products.json' assert { type: 'json' };
export class ProductsController {
    dataModel;
    constructor(dataModel) {
        this.dataModel = dataModel;
    }
    async getAll(_req, resp, next) {
        try {
            const data = await this.dataModel.getAll();
            resp.json(data).end();
        }
        catch (error) {
            const httpError = new HTTPError(503, 'Service unavailable', error.message);
            next(httpError);
            return;
        }
    }
    get(_req, _resp) {
        //
    }
    async post(req, resp, next) {
        if (!req.body.nombre) {
            const httpError = new HTTPError(503, 'service not available', 'nombre not included in the data');
            next(httpError);
            return;
        }
        try {
            const newProduct = await this.dataModel.post(req.body);
            resp.json(newProduct).end();
        }
        catch (error) {
            const httpError = new HTTPError(503, 'service unavailable', error.message);
            next(httpError);
            return;
        }
    }
    async patch(req, resp, next) {
        try {
            const updateProduct = await this.dataModel.patch(+req.params.id, req.body);
            resp.json(updateProduct).end();
        }
        catch (error) {
            if (error.message === 'Not found id') {
                const httpError = new HTTPError(404, 'Not Found', error.message);
                next(httpError);
                return;
            }
        }
    }
    async delete(req, resp, next) {
        try {
            await this.dataModel.delete(+req.params.id);
            resp.json({}).end();
        }
        catch (error) {
            if (error.message === 'Not found id') {
                const httpError = new HTTPError(404, 'Not Found', error.message);
                next(httpError);
                return;
            }
            const httpError = new HTTPError(503, 'Service unavailable', error.message);
            next(httpError);
            return;
        }
    }
}
