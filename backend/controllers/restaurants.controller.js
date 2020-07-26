import axios from 'axios';
import Restaurant from '../models/restaurantModel';
import config from '../config';

const getRestaurants = async (req, res) => {
  try {
    let { latitude, longitude, city } = req.body;
    if ((!latitude || !longitude) && !city) {
      res
        .status(401)
        .send({ msg: 'city or latitude and longitude are required!' });
    }
    if (city) {
      const coordinates = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${config.ACCESS_TOKEN}`
      );
      const response = coordinates.data.features[0].center;
      latitude = response[1];
      longitude = response[0];
      if (!latitude || !longitude) {
        res.status(401).send({ msg: 'City not found!' });
      }
    }

    if (!latitude || !longitude) {
      res.status(401).send({ msg: 'latitude and longitude are required!' });
    } else {
      const restaurants = await axios.get(
        `https://places.sit.ls.hereapi.com/places/v1/discover/search?apiKey=${config.API_KEY}&at=${latitude},${longitude}&q=restaurant&pretty&size=10`
      );

      const newRestaurant = new Restaurant({
        userId: req.userId,
        coordinates: {
          latitude,
          longitude
        }
      });
      await newRestaurant.save();
      res.send(restaurants.data.results.items);
    }
  } catch (error) {
    res.status(500).send({ msg: 'Server error', error });
  }
};

const getRestaurantsTransactions = async (req, res) => {
  try {
    const restaurantTransactions = await Restaurant.find({
      userId: req.userId
    }).sort({
      createdAt: 'desc'
    });
    res.send(restaurantTransactions);
  } catch (error) {
    res.status(500).send({ msg: 'Server error', error });
  }
};

export { getRestaurants, getRestaurantsTransactions };
