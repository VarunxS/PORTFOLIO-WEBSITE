import { NextResponse } from 'next/server';
import { getCaseStudies, createCaseStudy } from '@/lib/data';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const filters = {
        status: searchParams.get('status') || 'published',
        featured: searchParams.get('featured') === 'true' ? true : undefined
    };

    const caseStudies = getCaseStudies(filters);
    return NextResponse.json(caseStudies);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.title || !body.client || !body.challenge) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (!body.slug) {
            body.slug = body.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
        }

        const caseStudy = createCaseStudy(body);
        return NextResponse.json(caseStudy, { status: 201 });

    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create case study' },
            { status: 500 }
        );
    }
}
