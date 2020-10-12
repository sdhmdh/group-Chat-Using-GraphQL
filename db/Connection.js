import mongoose from 'mongoose';
require('dotenv').config();

const URI = process.env.MONGO_URI
const connectToDB = async () => {
    await mongoose.connect(URI, {
         useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('connected to database!');
}   

export default connectToDB;