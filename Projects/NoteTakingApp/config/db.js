
import mongoose from "mongoose";

const connectDB = async () => {

    try {

        const conn = await mongoose.connect(process.env.MONGO_URI); //hardcoding the URL is not safe for production, so store it in the .env file

        console.log(`MongoDB connected: ${conn.connection.host}`);

    }
    catch(error) {

        console.error(`MongoDB connection failed: ${error.message}`);
        console.error(error.stack);

        process.exit(1); //Exit process with failure
        
    }

}

export default connectDB;