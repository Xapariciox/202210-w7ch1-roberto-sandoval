import { ProtoSneaker, Sneaker } from '../interfaces/product';
import { Data, id } from './data.js';
import mongoose, { Schema, model } from 'mongoose';

export class SneakerRepository implements Data<Sneaker> {
    #schema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        offer: Boolean,
        brand: String,
        price: Number,
        color: String,
        image: String,
        Description: String,
    });
    #Model = model('Sneaker', this.#schema, 'snakers');

    constructor() {
        this.#schema.set('toJSON', {
            transform: (_document, returnedObject) => {
                returnedObject.id = returnedObject._id;
                delete returnedObject.__v;
                delete returnedObject._id;
            },
        });
    }

    async getAll(): Promise<Array<Sneaker>> {
        return this.#Model.find();
    }
    async get(id: id): Promise<Sneaker> {
        const result = await this.#Model.findById(id); //as Sneaker;
        if (!result) throw new Error('Not found id');
        return result as Sneaker;
    }

    async post(data: ProtoSneaker): Promise<Sneaker> {
        const result = await this.#Model.create(data);
        return result as Sneaker;
    }
    async patch(id: id, data: Partial<Sneaker>): Promise<Sneaker> {
        const result = await this.#Model.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!result) throw new Error('Not found id');
        return result as Sneaker;
    }

    async delete(id: id): Promise<void> {
        const result = await this.#Model.findByIdAndDelete(id);
        if (result === null) throw new Error('Not found id');
        return;
    }

    #disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }

    getModel() {
        return this.#Model;
    }
}
