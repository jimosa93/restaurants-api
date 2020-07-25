import axios from 'axios';
import Restaurant from '../models/restaurantModel';

const getRestaurants = async (req, res) => {
  console.log(req.userId);
  const { latitude, longitude } = req.body;
  if (!latitude || !longitude) {
    res.status(401).send({ msg: 'latitude and longitude are required!' });
  } else {
    const restaurants = await axios.get(
      `https://places.sit.ls.hereapi.com/places/v1/discover/search?apiKey=LicXSWVyX7FecTmkQjJisSOjqpXCeg5qIuyLiq0zb_s&at=${latitude},${longitude}&q=restaurant&pretty&size=10`
    );
    const newRestaurant = new Restaurant({
      userId: req.userId,
      coordinates: {
        latitude,
        longitude
      }
    });
    await newRestaurant.save();
    res.send({
      _id: newRestaurant.id,
      coordinates: newRestaurant.coordinates
    });
  }
};

const getRestaurantsTransactions = async (req, res) => {
  const restaurantTransactions = await Restaurant.find({
    userId: req.userId
  }).sort({
    createdAt: 'desc'
  });
  res.send(restaurantTransactions);
};

export { getRestaurants, getRestaurantsTransactions };
