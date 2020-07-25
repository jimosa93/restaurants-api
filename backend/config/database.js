import mongoose from 'mongoose';
import config from '../config';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb://localhost/${config.MONGO_DB}`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
    process.exit(1);
  }
};

export default connectDB;
