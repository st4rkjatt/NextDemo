import mongoose from 'mongoose';

export async function connect() {
    try{
       await mongoose.connect("mongodb://localhost:27017/demo");

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected successfully")
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error' + err);
            process.exit();
       })
    } catch (error) {
        console.log(error);
    }
}