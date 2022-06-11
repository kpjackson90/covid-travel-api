import { app } from './app';
import mongoose from 'mongoose';

const start = async () => {

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined");
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateindex: true
        })
        /**NOTE:- replace console.logs with proper logging */
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err)
    }

    app.listen(5000, () => {
        console.log('Covid API listening on PORT 5000')
    })
}

start();