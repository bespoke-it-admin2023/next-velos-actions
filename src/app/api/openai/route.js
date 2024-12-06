// app/api/openai/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function OPTIONS() {
    try {
        return NextResponse.json(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow all origins for testing
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Credentials': 'true',
            },
        });
    } catch (error) {
        console.error('Error in OPTIONS:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
    const { messages } = await request.json();

    if (!messages) {
        return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

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

        return NextResponse.json(response.data, {
            headers: {
                'Access-Control-Allow-Origin': '*',  // Allow all origins for testing
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Credentials': 'true',
            },
        });
    } catch (error) {
        console.error('Error in POST:', error);
        return NextResponse.json({ error: 'Error communicating with OpenAI API' }, { status: 500 });
    }
}