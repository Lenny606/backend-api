import mongoose from 'mongoose'
import {DB_URI, NODE_ENV, PORT} from "../env.js";

if (!DB_URI) {
    throw new Error('Database URI is required');
}


export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connect DB in ${NODE_ENV}`)


    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
}