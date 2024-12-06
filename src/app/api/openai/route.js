// app/api/openai/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
    const { messages } = await request.json();

    if (!messages) {
        return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY; // Ensure your API key is stored in `.env.local`

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o-mini', // or 'gpt-4' if you have access
            messages: messages,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        // Send back the response data from OpenAI
        const data = response.data;
        return NextResponse.json(data);
        
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);
        return NextResponse.json({ error: 'Error communicating with OpenAI API' }, { status: 500 });
    }
}