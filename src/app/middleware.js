// app/middleware.js
import { NextResponse } from 'next/server';

const allowedOrigins = ['https://www.velosai.pro', '*'];

export function middleware(request) {
    const origin = request.headers.get('origin');

    const response = NextResponse.next();

    // Check if the request's origin is in allowed origins
    if (allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin); // Allow the requesting origin
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Methods allowed
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Headers allowed
    }

    return response;
}