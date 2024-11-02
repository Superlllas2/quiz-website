// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import questionsRoute from './routes/questionsRoute.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config({ path: './backend/.env' });

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB()
    .then(() => console.log('MongoDB connection successful'))
    .catch((error) => console.error('MongoDB connection failed:', error));

// Enable CORS
app.use(cors()); // This will allow all origins. Adjust if needed.

app.use(express.json());
app.use('/api/questions', questionsRoute);
app.use('/api/auth', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
