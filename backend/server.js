import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import mongoose from 'mongoose';
import morgan from 'morgan';
import userRoute from './routes/userRoute';
import restaurantRoute from './routes/restaurantRoute';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/users', userRoute);
app.use('/api/restaurants', restaurantRoute);

app.listen(5000, () => console.log('Server started at htt://localhost:5000'));
