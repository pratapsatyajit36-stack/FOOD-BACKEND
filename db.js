import mongoose from "mongoose";

async function connectDb() {
    try {
        const result = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected Sucessfully");
    } catch (error) {
        console.log("Database Error", error);
    }

}
export default connectDb;