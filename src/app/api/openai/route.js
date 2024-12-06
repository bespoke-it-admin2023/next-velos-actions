import { NextResponse } from 'next/server';
import axios from 'axios';

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': 'https://www.velosai.pro', // Your frontend's origin
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true', // Allow credentials if needed
};

// Handle CORS preflight request for OPTIONS method
export async function OPTIONS() {
    return NextResponse.json(null, {
        status: 204,
        headers: CORS_HEADERS,
    });
}

export async function POST(request) {
    const { messages } = await request.json();

    if (!messages) {
        return NextResponse.json({ error: 'Messages are required' }, {
            status: 400,
            headers: CORS_HEADERS,
        });
    }

    const apiKey = process.env.OPENAI_API_KEY; // Your OpenAI API key

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o-mini',
            messages: messages,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        return NextResponse.json(response.data, { headers: CORS_HEADERS });
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);
        return NextResponse.json({ error: 'Error communicating with OpenAI API' }, {
            status: 500,
            headers: CORS_HEADERS,
        });
    }
}