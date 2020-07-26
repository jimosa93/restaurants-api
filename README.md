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

| API                             | Description                                   | METHOD |
| ------------------------------- | --------------------------------------------- | ------ |
| `/api/users/signup`             | Create a new user                             | POST   |
| `/api/users/signin`             | User Login with email and password            | POST   |
| `/api/restaurants`              | Get nearby restaurants by city or coordinates | POST   |
| `/api/restaurants/transactions` | Get transactions from authenticated user      | GET    |
