import mongoose from 'mongoose';

export async function connect() {
    try{
       const mongoUrl = process.env.MONGO_URL;
       if (!mongoUrl) {
           throw new Error('MONGO_URL environment variable is not defined');
       }
       await mongoose.connect(mongoUrl);

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