import mongoose from 'mongoose';
import { dbConnect } from '../db.connect.js';
import { SneakerRepository } from './sneaker.repository';

const mockData = [
    {
        name: 'Air Fore',
        offer: false,
        brand: 'Nike',
        price: 37.856273,
        color: '-4.7769922',
        image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.es%2FNIKE-Force-Zapatillas-Baloncesto-Unisex%2Fdp%2FB0BLSQ9D5Y&psig=AOvVaw3qbM6qUoZo37xCbBhxDDUk&ust=1668799286641000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLCRuPf3tfsCFQAAAAAdAAAAABAG',
        Description: 'cool',
        id: '637691867fe2287bd9a7a03f',
    },
    {
        name: 'SP',
        offer: false,
        brand: 'adidas',
        price: 37.856273,
        color: 'blanco',
        image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.es%2FNIKE-Force-Zapatillas-Baloncesto-Unisex%2Fdp%2FB0BLSQ9D5Y&psig=AOvVaw3qbM6qUoZo37xCbBhxDDUk&ust=1668799286641000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLCRuPf3tfsCFQAAAAAdAAAAABAG',
        Description: 'cool',
        id: '637691a17fe2287bd9a7a041',
    },
];

describe('Given ...', () => {
    const repository = new SneakerRepository();
    let testIds: Array<string>;
    beforeAll(async () => {
        await dbConnect();
        await repository.getModel().deleteMany();
        await repository.getModel().insertMany(mockData);
        const data = await repository.getModel().find();
        testIds = [data[0].id, data[1].id];
    });

    test('Then getAll...', async () => {
        const result = await repository.getAll();
        expect(result[0].name).toEqual(mockData[0].name);
    });

    test('Then post ...', async () => {
        const newSneaker = {
            name: 'arabica',
        };
        const result = await repository.post(newSneaker);
        expect(result.name).toEqual(newSneaker.name);
    });

    afterAll(() => {
        mongoose.disconnect();
    });
});
