import mongoose from 'mongoose';

const connectDb = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'silentvoice'
        });
        console.log("✅ MongoDB connected successfully");
        console.log(`📊 Database: ${mongoose.connection.name}`);
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDb;