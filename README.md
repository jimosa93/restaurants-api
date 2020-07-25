# Restaurants API

## Environment Variables

Inside the backend folder create a .env file with the following credentials:

- `MONGO_DB`
- `JWT_SECRET`

## Quick Start

```bash
# Run in Docker
docker-compose up
# use -d flag to run in background

# Tear down
docker-compose down

# To be able to edit files, add volume to compose file
volumes: ['./:/usr/src/app']

# To re-build
docker-compose build
```

## Endpoints

POST - `/api/users/signup`
POST - `/api/users/signin`
POST - `/api/restaurants`
GET - `/api/restaurants/transactions`
