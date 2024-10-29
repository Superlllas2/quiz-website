// backend/routes/questionsRoute.js
const express = require('express');
const router = express.Router();
const { getQuestion } = require('../controllers/questionsController');

// Define the route to get questions
router.post('/', getQuestion);

module.exports = router;
