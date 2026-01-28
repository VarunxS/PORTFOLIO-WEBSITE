import { NextResponse } from 'next/server';
import { getProjects, createProject } from '@/lib/data';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const filters = {
        category: searchParams.get('category') || undefined,
        status: searchParams.get('status') || 'published', // Default to published for public API
        featured: searchParams.get('featured') === 'true' ? true : undefined
    };

    const projects = getProjects(filters);
    return NextResponse.json(projects);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validation
        if (!body.title || !body.category || !body.description) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Generate slug if not provided
        if (!body.slug) {
            body.slug = body.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
        }

        const project = createProject(body);
        return NextResponse.json(project, { status: 201 });

    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 500 }
        );
    }
}
