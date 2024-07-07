import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("MongoDB connected")
      }
      catch (err) {
        console.log("Error while connecting to DB", err)
        process.exit(1)
      }
}
export default connectDB