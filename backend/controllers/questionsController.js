// backend/controllers/questionsController.js
import axios from 'axios';

export const getQuestions = async (req, res) => {
    const { topic = "science", numberOfQuestions = 9 } = req.body; // Default to "science" and 9 questions

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
                        content: `Generate ${numberOfQuestions} unique multiple-choice questions about ${topic} with 4 answer options each. Output only a JSON array with no explanations or formatting.`
                    }
                ],
                max_tokens: 1500,
                temperature: 0.5
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                }
            }
        );

        let generatedQuestions;
        let responseContent = response.data.choices[0].message.content;

        // Remove code block formatting (e.g., ```json at the start and ``` at the end)
        responseContent = responseContent.replace(/```json\s*|```/g, '');

        try {
            // Parse the cleaned response content
            generatedQuestions = JSON.parse(responseContent);
        } catch (parseError) {
            console.error("Error parsing OpenAI response:", parseError);
            return res.status(500).json({ error: 'Failed to parse response from OpenAI' });
        }

        res.json(generatedQuestions);
    } catch (error) {
        console.error("Error fetching questions:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
};
