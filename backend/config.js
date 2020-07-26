export default {
  MONGO_DB: process.env.MONGO_DB || 'restaurants',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  API_KEY: process.env.API_KEY || 'LicXSWVyX7FecTmkQjJisSOjqpXCeg5qIuyLiq0zb_s',
  ACCESS_TOKEN:
    process.env.ACCESS_TOKEN ||
    'pk.eyJ1Ijoiamltb3NhOTMiLCJhIjoiY2tjOWJmZGQ5MHRreTJzbGNyM2NjZGEwMiJ9.e2IpnDxfHmSxy9HosfupZw'
};
