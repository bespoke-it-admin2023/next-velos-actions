// app/api/openai/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

// CORS Headers won't be needed here since they are handled by middleware

// CORS preflight request for OPTIONS method (optional if using middleware)
export async function OPTIONS() {
    return NextResponse.json(null, {
        status: 204,
    });
}

// Handle POST requests
export async function POST(request) {
    const { messages } = await request.json();

    if (!messages) {
        return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY; // Your OpenAI API key

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: messages,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        return NextResponse.json(response.data); // No need for extra headers
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);
        return NextResponse.json({ error: 'Error communicating with OpenAI API' }, {
            status: 500,
        });
    }
}