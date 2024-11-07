import express from 'express';
import path from 'path'; // Import path to serve static files properly
const app = express();

const PORT = process.env.PORT || 5002;

// Serve the main HTML file for all other routes (useful for single-page applications)
app.get('*', (req, res) => {
    const __dirname = path.resolve();
    console.log(__dirname);
    app.use(express.static(path.join(__dirname, 'dist'))); // Adjust 'public' if your folder has a different name

    res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Adjust 'public/index.html' as needed
});

const __dirname = path.resolve();
console.log(__dirname);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});