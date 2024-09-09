import mongoose from "mongoose";
import 'dotenv/config'

export const connectdb = async ()=>{
    await mongoose.connect('mongodb://localhost:27017/food-del').then(console.log('Database connected'))
    // await mongoose.connect(process.env.MONGO_URI||'mongodb://localhost:27017/food-del').then(console.log('Database connected'))
}