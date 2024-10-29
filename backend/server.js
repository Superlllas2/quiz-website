// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const questionsRoute = require('./routes/questionsRoute');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Use routes
app.use('/api/questions', questionsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
