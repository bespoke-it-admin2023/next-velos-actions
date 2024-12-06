// app/api/openai/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': 'https://www.velosai.pro', // Set to your actual frontend URL
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Include allowed methods
    'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Include headers
    'Access-Control-Allow-Credentials': 'true', // Allow credentials
};

export async function OPTIONS() {
    return NextResponse.json(null, {
        status: 204,
        headers: CORS_HEADERS,
    });
}

export async function POST(request) {
    const { messages } = await request.json();

    if (!messages) {
        return NextResponse.json({ error: 'Messages are required' }, { status: 400, headers: CORS_HEADERS });
    }

    const apiKey = process.env.OPENAI_API_KEY; // Ensure your API key is stored in .env.local

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
        return NextResponse.json({ error: 'Error communicating with OpenAI API' }, { status: 500, headers: CORS_HEADERS });
    }
}