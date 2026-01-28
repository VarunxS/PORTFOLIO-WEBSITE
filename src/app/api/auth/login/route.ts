import { NextResponse } from 'next/server';
import { comparePassword, createAuthToken } from '@/lib/auth';
import { readData } from '@/lib/data';

interface AdminUser {
    email: string;
    passwordHash: string;
    name: string;
}

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Read admin credentials from data/admin.json
        // readData returns an array actually in our helper?
        // Wait, the seed data for admin.json was an OBJECT, not an array.
        // Let's check `lib/data.ts`.
        // It says `return JSON.parse(fileContent);`.
        // So if the file is an array, it returns an array. If object, returns object.
        // My seed data for admin.json was `{ "email": ... }`.
        // But `readData<T>` return type signature says `T[]`.
        // This is a type mismatch in my `lib/data.ts` potentially if I strictly follow T[].
        // However, JS is loose. `readData` calculates based on JSON.
        // Let's assume for admin.json it returns the object directly if the file contains an object.

        // Actually, looking at `readData` implementation:
        // export function readData<T>(filename: string): T[] { ... }
        // It implies it expects an array.
        // But `JSON.parse` will return whatever is in the file.
        // So for admin.json, which is an object, it will return that object.
        // The Typescript return type lie is acceptable for now or I should cast.

        // Let's use `any` to bypass the T[] expectation for admin.
        const admin = readData<any>('admin.json') as unknown as AdminUser;

        if (!admin || email !== admin.email) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const isValid = await comparePassword(password, admin.passwordHash);

        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Create auth token (JWT)
        const token = await createAuthToken({ email: admin.email, name: admin.name });

        const response = NextResponse.json({
            success: true,
            user: { email: admin.email, name: admin.name }
        });

        // Set HTTP-only cookie
        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
}
