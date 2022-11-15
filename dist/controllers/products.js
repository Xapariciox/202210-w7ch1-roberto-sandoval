// import importData from '../server/products.json' assert { type: 'json' };
export class ProductsController {
    dataModel;
    constructor(dataModel) {
        this.dataModel = dataModel;
    }
    async getAll(_req, resp) {
        const data = await this.dataModel.getAll();
        resp.json(data).end();
    }
    get(req, resp) {
        // data = data.filter((item) => item.id === +req.params.id);
        // resp.json(data);
        // resp.end();
    }
    async post(req, resp) {
        const newProduct = await this.dataModel.post(req.body);
        resp.json(newProduct).end();
    }
    patch(req, resp) {
        // const updateProduct = {
        //     ...data.find((item) => item.id === +req.params.id),
        //     ...req.body,
        // };
        // data[data.findIndex((item) => item.id === +req.params.id)] =
        //     updateProduct;
        // resp.json(updateProduct);
        // resp.end();
    }
    delete(req, resp, next) {
        //     if (!data.find((item) => item.id === +req.params.id)) {
        //         next(new Error('Not found'));
        //         return;
        //     }
        //     data = data.filter((item) => item.id !== +req.params.id);
        //     resp.json({});
        //     resp.end();
    }
}
