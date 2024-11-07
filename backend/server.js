import express from 'express';
import path from 'path'; // Import path to serve static files properly
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
const app = express();
const PORT = process.env.PORT || 5001;

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
