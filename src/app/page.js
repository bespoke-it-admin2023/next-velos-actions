// pages/index.js
"use client"
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        window.location.href = "/index.html";
    }, []);

    return null; // Return null or a loading spinner while redirecting
}