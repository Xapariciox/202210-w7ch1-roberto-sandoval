import importData from '../server/products.json' assert { type: 'json' };
let data = importData.Products;
export class ProductsController {
    getAll(_req, resp) {
        resp.json(data);
        resp.end();
    }
    get(req, resp) {
        data = data.filter((item) => item.id === +req.params.id);
        resp.json(data);
        resp.end();
    }
    post(req, resp) {
        const newProduct = {
            ...req.body,
            id: data.length + 1,
        };
        data.push(newProduct);
        resp.json(newProduct);
        resp.end();
    }
    patch(req, resp) {
        const updateProduct = {
            ...data.find((item) => item.id === +req.params.id),
            ...req.body,
        };
        data[data.findIndex((item) => item.id === +req.params.id)] =
            updateProduct;
        resp.json(updateProduct);
        resp.end();
    }
    delete(req, resp, next) {
        if (!data.find((item) => item.id === +req.params.id)) {
            next(new Error('Not found'));
            return;
        }
        data = data.filter((item) => item.id !== +req.params.id);
        resp.json({});
        resp.end();
    }
}
