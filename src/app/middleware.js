// app/middleware.js
import { NextResponse } from 'next/server';

const allowedOrigins = ['https://www.velosai.pro'];

export function middleware(request) {
    const origin = request.headers.get('origin');
    const response = NextResponse.next();

    // Check if the request's origin is allowed
    if (allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin); // Dynamically set allowed origin
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); 
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
        response.headers.set('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    }

    return response;
}