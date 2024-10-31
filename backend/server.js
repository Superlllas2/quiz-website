// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import questionsRoute from './routes/questionsRoute.js';

dotenv.config({ path: './backend/.env' });

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS
app.use(cors()); // This will allow all origins. Adjust if needed.

app.use(express.json());
app.use('/api/questions', questionsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
