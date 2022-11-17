import { Router } from 'express';
import { SneakersController } from '../controllers/sneakers.js';


import { Data } from '../data/data.js';
import { ProductFileData } from '../data/products.file.data.js';
import { Sneaker } from '../interfaces/product.js';


export const productRouter = Router();
const model: Data<Sneaker> = new ProductFileData();

const controller = new SneakersController(model);

productRouter.get('/', controller.getAll.bind(controller));
productRouter.get('/:id', controller.get.bind(controller));
productRouter.post('/', controller.post.bind(controller));
productRouter.patch('/:id', controller.patch.bind(controller));
productRouter.delete('/:id', controller.delete.bind(controller));
