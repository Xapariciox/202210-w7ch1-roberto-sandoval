import { Request, Response } from 'express';
import { ProductsController } from './products';

describe('Given productsControler', () => {
    const productsController = new ProductsController();
    const req = {};
    const resp = {
        json: jest.fn(),
        end: jest.fn(),
    };
    test('when the method GetAll is called ', () => {
        productsController.getAll(req as Request, resp as unknown as Response);
        expect(resp.json).toHaveBeenCalled();
        expect(resp.end).toHaveBeenCalled();
    });
    test('when the method get is called ', () => {
        productsController.get(req as Request, resp as unknown as Response);
        expect(resp.json).toHaveBeenCalled();
        expect(resp.end).toHaveBeenCalled();
    });
    test('when the method Post is called ', () => {
        productsController.post(req as Request, resp as unknown as Response);
        expect(resp.json).toHaveBeenCalled();
        expect(resp.end).toHaveBeenCalled();
    });
    test('when the method Patch is called ', () => {
        productsController.patch(req as Request, resp as unknown as Response);
        expect(resp.json).toHaveBeenCalled();
        expect(resp.end).toHaveBeenCalled();
    });
    // test('when the method delete is called ', () => {
    //     productsController.delete(req as Request, resp as unknown as Response);
    //     expect(resp.json).toHaveBeenCalled();
    //     expect(resp.end).toHaveBeenCalled();
    // });
});
