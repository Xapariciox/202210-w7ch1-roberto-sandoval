import mongoose from 'mongoose';

export function dbConnect() {
    const DBName =
        process.env.NODE_ENV !== 'test'
            ? 'Challengue4'
            : 'Challengue 4 testing';
    const nameBaseData = 'Sneakers';
    const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.lvrldiy.mongodb.net/${nameBaseData}?retryWrites=true&w=majority`;
    return mongoose.connect(uri);
}
