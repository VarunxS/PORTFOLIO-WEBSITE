import { NextResponse } from 'next/server';
import { getLeadership, saveLeadership } from '@/lib/data';
import { verifyAuth } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    const positions = getLeadership();
    const position = positions.find((p) => p.id === params.id);

    if (!position) {
        return NextResponse.json({ error: 'Position not found' }, { status: 404 });
    }

    return NextResponse.json(position);
}

export async function PUT(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token');

    if (!token || !(await verifyAuth(token.value))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await request.json();
        const positions = getLeadership();
        const index = positions.findIndex((p) => p.id === params.id);

        if (index === -1) {
            return NextResponse.json({ error: 'Position not found' }, { status: 404 });
        }

        const updatedPosition = {
            ...positions[index],
            ...data,
            id: params.id, // Ensure ID doesn't change
        };

        positions[index] = updatedPosition;
        saveLeadership(positions);

        return NextResponse.json(updatedPosition);
    } catch (error) {
        console.error('Failed to update position:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token');

    if (!token || !(await verifyAuth(token.value))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const positions = getLeadership();
        const filteredPositions = positions.filter((p) => p.id !== params.id);

        if (filteredPositions.length === positions.length) {
            return NextResponse.json({ error: 'Position not found' }, { status: 404 });
        }

        saveLeadership(filteredPositions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete position:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
