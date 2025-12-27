#!/usr/bin/env node
/**
 * Script to inject API URL into HTML for Netlify deployment
 * Run this as a build command in Netlify, or use environment variable injection
 */

const fs = require('fs');
const path = require('path');

const apiUrl = process.env.REACT_APP_API_URL || process.env.API_URL || '';

if (!apiUrl) {
    console.warn('⚠️  REACT_APP_API_URL not set. Using default /api');
}

const htmlPath = path.join(__dirname, '..', '..', 'frontend', 'index.html');

if (fs.existsSync(htmlPath)) {
    let html = fs.readFileSync(htmlPath, 'utf8');
    
    // Replace placeholder with actual API URL
    html = html.replace(/%REACT_APP_API_URL%/g, apiUrl);
    
    // Also inject as a script variable for JavaScript access
    if (apiUrl) {
        const scriptTag = `<script>window.API_BASE_URL = "${apiUrl}";</script>`;
        html = html.replace('</head>', `${scriptTag}</head>`);
    }
    
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log(`✅ Injected API URL: ${apiUrl || '/api (default)'}`);
} else {
    console.error('❌ index.html not found');
    process.exit(1);
}

