import { Robot, ProtoRobot } from '../entities/robot';
import { Data, id } from './data.js';
import mongoose, { Schema, model } from 'mongoose';

export class RobotRepository implements Data<Robot> {
    #schema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        image: String,
        speed: String,
        endurance: String,
        date: String,
    });
    #Model = model('Robot', this.#schema, 'robots');

    constructor() {
        this.#schema.set('toJSON', {
            transform: (_document, returnedObject) => {
                returnedObject.id = returnedObject._id;
                delete returnedObject.__v;
                delete returnedObject._id; //Pendiente ver si puedo quitar el Date
            },
        });
    }

    async getAll(): Promise<Array<Robot>> {
        return this.#Model.find();
    }
    async get(id: id): Promise<Robot> {
        const result = await this.#Model.findById(id);
        if (!result) throw new Error('Not found id');
        return result as Robot;
    }

    async post(data: ProtoRobot): Promise<Robot> {
        const result = await this.#Model.create(data);
        return result as Robot;
    }
    async patch(id: id, data: Partial<Robot>): Promise<Robot> {
        const result = await this.#Model.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!result) throw new Error('Not found id');
        return result as Robot;
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
