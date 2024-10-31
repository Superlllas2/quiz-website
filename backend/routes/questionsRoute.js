// backend/routes/questionsRoute.js
import express from 'express';
import { getQuestion } from '../controllers/questionsController.js';

const router = express.Router();
router.post('/', getQuestion);

export default router;
