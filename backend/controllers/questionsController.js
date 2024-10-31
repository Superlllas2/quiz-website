// backend/controllers/questionsController.js
import axios from 'axios';

export const getQuestion = async (req, res) => {
    const { topic } = req.body;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",  // Use the new model
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant that generates multiple-choice questions."
                    },
                    {
                        role: "user",
                        content: `Generate a multiple-choice question about ${topic} with 4 options. Format: { "question": "text", "options": ["opt1", "opt2", "opt3", "opt4"], "answer_index": 2 }`
                    }
                ],
                max_tokens: 100,
                temperature: 0.5
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                }
            }
        );

        // Send the question data back to the frontend
        res.json(JSON.parse(response.data.choices[0].message.content));
    } catch (error) {
        console.error("Error fetching question:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch question' });
    }
};
