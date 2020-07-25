import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import morgan from 'morgan';
import userRoute from './routes/userRoute';
import restaurantRoute from './routes/restaurantRoute';

dotenv.config();

connectDB();

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/users', userRoute);
app.use('/api/restaurants', restaurantRoute);

app.listen(app.get('port'), () =>
  console.log('Server is running on ', app.get('port'))
);
