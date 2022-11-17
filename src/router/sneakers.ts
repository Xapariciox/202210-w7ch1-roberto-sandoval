import { Router } from 'express';
import { SneakersController } from '../controllers/sneakers.js';
import { SneakerRepository } from '../data/sneaker.repository.js';

export const sneakerRouter = Router();

const controller = new SneakersController(new SneakerRepository());

sneakerRouter.get('/', controller.getAll.bind(controller));
sneakerRouter.get('/:id', controller.get.bind(controller));
sneakerRouter.post('/', controller.post.bind(controller));
sneakerRouter.patch('/:id', controller.patch.bind(controller));
sneakerRouter.delete('/:id', controller.delete.bind(controller));
