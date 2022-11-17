import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { CustomError } from './interfaces/error.js';
import { sneakerRouter } from './router/sneakers.js';

export const app = express();
app.disable('x-powered-by');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    const origin = req.header('Origin') || '*';
    res.setHeader('Access-Control-Allow-Origin', origin as string);
    next();
});

app.get('/', (req, res) => {
    res.send('Bienvenido a mi Home');
});

app.use('/sneakers', sneakerRouter);

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
