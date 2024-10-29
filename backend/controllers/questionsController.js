// backend/controllers/questionsController.js
const axios = require('axios');

exports.getQuestion = async (req, res) => {
    const { topic } = req.body;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: "text-davinci-003",
                prompt: `Generate a multiple-choice question about ${topic} with 4 options. Format: { "question": "text", "options": ["opt1", "opt2", "opt3", "opt4"], "answer_index": 2 }`,
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
        res.json(JSON.parse(response.data.choices[0].text));
    } catch (error) {
        console.error("Error fetching question:", error);
        res.status(500).json({ error: 'Failed to fetch question' });
    }
};
