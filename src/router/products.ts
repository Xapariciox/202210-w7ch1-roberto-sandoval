import { Router } from 'express';

import { ProductsController } from '../controllers/products.js';
import { Data } from '../data/data.js';
import { ProductFileData } from '../data/products.file.data.js';
import { Product } from '../interfaces/product.js';

export const productRouter = Router();
const model: Data<Product> = new ProductFileData();

const controller = new ProductsController(model);

productRouter.get('/', controller.getAll.bind(controller));
productRouter.get('/:id', controller.get.bind(controller));
productRouter.post('/', controller.post.bind(controller));
productRouter.patch('/:id', controller.patch.bind(controller));
productRouter.delete('/:id', controller.delete.bind(controller));
