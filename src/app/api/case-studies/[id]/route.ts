import { NextResponse } from 'next/server';
import { getCaseStudies, updateCaseStudy, deleteCaseStudy } from '@/lib/data';

export async function GET(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;

    const caseStudies = getCaseStudies();
    const caseStudy = caseStudies.find(cs => cs.id === params.id);

    if (!caseStudy) {
        return NextResponse.json({ error: 'Case Study not found' }, { status: 404 });
    }

    return NextResponse.json(caseStudy);
}

export async function PUT(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;

    try {
        const body = await request.json();
        const updated = updateCaseStudy(params.id, body);

        if (!updated) {
            return NextResponse.json(
                { error: 'Case Study not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update case study' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;

    try {
        const result = deleteCaseStudy(params.id);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Case Study not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete case study' },
            { status: 500 }
        );
    }
}
