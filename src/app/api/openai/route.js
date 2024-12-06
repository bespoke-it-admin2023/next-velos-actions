// app/api/openai/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': 'https://www.velosai.pro/', // Change to your frontend URL
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// CORS preflight response for OPTIONS requests
export async function OPTIONS() {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request) {
    const { messages } = await request.json();

    if (!messages) {
        return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY; // Ensure your API key is stored in .env.local

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
            messages: messages,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        // Combine the OpenAI response with the CORS headers
        return NextResponse.json(response.data, { headers: CORS_HEADERS });
        
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);
        return NextResponse.json({ error: 'Error communicating with OpenAI API' }, { status: 500 });
    }
}