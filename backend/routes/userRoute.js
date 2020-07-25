import express from 'express';
import { signup, signin } from '../controllers/users.controller';

const router = express.Router();

router.post('/signin', signin);

router.post('/signup', signup);

export default router;
