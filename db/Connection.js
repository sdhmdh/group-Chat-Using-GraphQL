import mongoose from 'mongoose';

const URI = 'mongodb://sudhanshu123:sudhanshu123@cluster0-shard-00-00.9zed5.mongodb.net:27017,cluster0-shard-00-01.9zed5.mongodb.net:27017,cluster0-shard-00-02.9zed5.mongodb.net:27017/test?ssl=true&replicaSet=atlas-7wszc5-shard-0&authSource=admin&retryWrites=true&w=majority'
const connectToDB = async () => {
    await mongoose.connect(URI, {
         useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('connected to database!');
}   

export default connectToDB;