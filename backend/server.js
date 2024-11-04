import express from 'express';
import path from 'path'; // Import path to serve static files properly
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import questionsRoute from './routes/questionsRoute.js';
import userRoutes from './routes/userRoutes.js';
import protectedRoute from './routes/protectedRoute.js';

dotenv.config({ path: './backend/.env' });

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB()
    .then(() => console.log('MongoDB connection successful'))
    .catch((error) => console.error('MongoDB connection failed:', error));

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Define routes
app.use('/api/questions', questionsRoute);
app.use('/api/auth', userRoutes);
app.use('/api', protectedRoute);
app.use('/api/protected', protectedRoute);

// Serve static files from the frontend build directory (replace 'public' with your actual frontend build folder)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist'))); // Adjust 'public' if your folder has a different name

// Serve the main HTML file for all other routes (useful for single-page applications)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Adjust 'public/index.html' as needed
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
