// app/api/openai/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

// CORS Headers
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*', // Allow only your frontend URL
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true', // Allow credentials
};

// Handle CORS preflight request
export async function OPTIONS() {
    // Respond with 204 No Content for preflight requests
    return NextResponse.json(null, {
        status: 204,
        headers: CORS_HEADERS,
    });
}

// Handle POST requests to OpenAI API
export async function POST(request) {
    const { messages } = await request.json();

    // Ensure messages are provided
    if (!messages) {
        return NextResponse.json({ error: 'Messages are required' }, {
            status: 400,
            headers: CORS_HEADERS,
        });
    }

    const apiKey = process.env.OPENAI_API_KEY; // Get your OpenAI API key from environment variables

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo', // Specify the model you are using
            messages: messages,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        // Return the response from OpenAI with CORS headers
        return NextResponse.json(response.data, { headers: CORS_HEADERS });

    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);
        return NextResponse.json({ error: 'Error communicating with OpenAI API' }, {
            status: 500,
            headers: CORS_HEADERS,
        });
    }
}