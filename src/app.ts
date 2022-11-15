import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { CustomError } from './interfaces/error.js';
import { productRouter } from './router/products.js';

export const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenido a mi Home');
});
app.use('/product', productRouter);

app.use(
    (error: CustomError, _req: Request, resp: Response, next: NextFunction) => {
        console.log(error.statusCode, error.statusMessage, error.message);
        let status = error.statusCode || 500;
        if (error.name === 'ValidationError') {
            status = 406;
        } else {
            //
        }

        const result = {
            status: status,
            type: error.name,
            error: error.message,
        };
        resp.status(status).json(result).end();
    }
);
