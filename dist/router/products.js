import { Router } from 'express';
import { ProductsController } from '../controllers/products.js';
export const productRouter = Router();
const controller = new ProductsController();
productRouter.get('/', controller.getAll);
productRouter.get('/:id', controller.get);
productRouter.post('/', controller.post);
productRouter.patch('/:id', controller.patch);
productRouter.delete('/:id', controller.delete);
