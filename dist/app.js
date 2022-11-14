import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { productRouter } from './router/products.js';
export const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Bienvenido a mi Home');
});
app.use('/product', productRouter);
app.use((error, _req, resp, next) => {
    console.log(error.message);
    let status = 500;
    if (error.name === 'ValidationError') {
        status = 406;
    }
    else {
        //
    }
    resp.status(status);
    const result = {
        status: status,
        type: error.name,
        error: error.message,
    };
    resp.json(result);
    resp.end();
});
