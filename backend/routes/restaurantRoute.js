import express from 'express';
import { isAuth } from '../util';
import {
  getRestaurants,
  getRestaurantsTransactions
} from '../controllers/restaurants.controller';

const router = express.Router();

router.post('/', isAuth, getRestaurants);
router.get('/transactions', isAuth, getRestaurantsTransactions);

export default router;
