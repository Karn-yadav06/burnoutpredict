
import ollama from 'ollama';

export const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Message is required'
            });
        }

        const response = await ollama.chat({
            model: process.env.OLLAMA_MODEL || 'llama3.2',
            messages: [
                {
                    role: 'user',
                    content: message
                }
            ]
        });

        res.status(200).json({
            success: true,
            reply: response.message.content
        });

    } catch (error) {
        console.error('Ollama Error:', error);

        res.status(500).json({
            success: false,
            message: 'AI service error',
            error: error.message
        });
    }
};