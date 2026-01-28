import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

// Use a secret from env or a fallback for dev (USER SHOULD SET THIS IN PROD)
const JWT_SECRET = new TextEncoder().encode(
    process.env.SESSION_SECRET || 'default-secret-change-this-in-production'
);

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export async function comparePassword(
    password: string,
    hash: string
): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export async function createAuthToken(payload: any): Promise<string> {
    // Create a JWT that expires in 7 days
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(JWT_SECRET);
}

export async function verifyAuth(token: string): Promise<boolean> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        // Could add more checks here on payload if needed
        return !!payload;
    } catch (error) {
        return false;
    }
}

// Helper to get user info from token (server-side only typically)
export async function getSession(token: string) {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload;
    } catch {
        return null;
    }
}
