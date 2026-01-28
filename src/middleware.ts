import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from './lib/auth';

export async function middleware(request: NextRequest) {
    // Protect /admin routes except /admin/login
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        const token = request.cookies.get('auth-token')?.value;

        // If no token or invalid, redirect to login
        if (!token || !(await verifyAuth(token))) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // Protect admin API routes (POST, PUT, DELETE)
    // GET requests to projects/case-studies are public, but others might need protection
    if (request.nextUrl.pathname.startsWith('/api/') && request.method !== 'GET') {
        // Exception: /api/auth/login and /api/contact are public POSTs
        if (
            request.nextUrl.pathname === '/api/auth/login' ||
            request.nextUrl.pathname === '/api/contact'
        ) {
            return NextResponse.next();
        }

        const token = request.cookies.get('auth-token')?.value;

        if (!token || !(await verifyAuth(token))) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/:path*']
};
