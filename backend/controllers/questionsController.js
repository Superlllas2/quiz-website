// backend/controllers/questionsController.js
import axios from 'axios';

export const getQuestions = async (req, res) => {
    const { topics, difficulty, numberOfQuestions } = req.body;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant that generates unique multiple-choice questions."
                    },
                    {
                        role: "user",
                        content: `Generate ${numberOfQuestions} unique multiple-choice questions about the following topics: ${topics}. Difficulty level should be ${difficulty}. Format each question as: { "question": "text", "options": ["opt1", "opt2", "opt3", "opt4"], "answer_index": 2 }`
                    }
                ],
                max_tokens: 1000,
                temperature: 0.5
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                }
            }
        );

        const generatedQuestions = JSON.parse(response.data.choices[0].message.content);
        res.json(generatedQuestions);
    } catch (error) {
        console.error("Error fetching questions:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
};
