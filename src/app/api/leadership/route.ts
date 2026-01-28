import { NextResponse } from 'next/server';
import { getLeadership, saveLeadership, LeadershipPosition } from '@/lib/data';
import { verifyAuth } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
    const leadership = getLeadership();
    return NextResponse.json(leadership);
}

export async function POST(request: Request) {
    // Auth check
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token || !(await verifyAuth(token.value))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await request.json();

        // Validate basics
        if (!data.title || !data.organization) {
            return NextResponse.json({ error: 'Title and Organization are required' }, { status: 400 });
        }

        const newPosition: LeadershipPosition = {
            id: crypto.randomUUID(),
            title: data.title,
            organization: data.organization,
            startDate: data.startDate,
            endDate: data.endDate,
            current: data.current || false,
            description: data.description || '',
            type: data.type || 'Leadership',
            achievements: data.achievements || [],
            orderIndex: 0,
            createdAt: new Date().toISOString()
        };

        const currentPositions = getLeadership();
        // Prepend new position
        const updatedPositions = [newPosition, ...currentPositions];

        saveLeadership(updatedPositions);

        return NextResponse.json(newPosition);
    } catch (error) {
        console.error('Failed to create position:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
