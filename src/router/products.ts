import { Router } from 'express';

import { ProductsController } from '../controllers/products.js';
import { Data } from '../data/data.js';
import { ProductFileData } from '../data/products.file.data.js';
import { product } from '../interfaces/product.js';

export const productRouter = Router();
const model: Data<product> = new ProductFileData();

const controller = new ProductsController(model);

productRouter.get('/', controller.getAll.bind(controller));
productRouter.get('/:id', controller.get);
productRouter.post('/', controller.post);
productRouter.patch('/:id', controller.patch);
productRouter.delete('/:id', controller.delete);
