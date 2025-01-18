import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongodb connect "+conn.connection.host);
    }
    catch (err) {
        console.log("Connection error = "+err);
    }
}