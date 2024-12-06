// app/middleware.js
import { NextResponse } from 'next/server';

// Define allowed origins (you can modify this based on your needs)
const allowedOrigins = ['https://www.velosai.pro'];

export function middleware(request) {
    const origin = request.headers.get('origin');

    // Prepare a response and set CORS headers
    const response = NextResponse.next();

    // Set CORS headers if the origin is allowed
    if (allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        response.headers.set('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    }

    return response;
}