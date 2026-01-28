import { NextResponse } from 'next/server';
import { getProjectBySlug, updateProject, deleteProject } from '@/lib/data';

// Helper to determine if we are looking up by ID or Slug.
// Since the public pages use slug, but admin might use ID.
// However, the standard Next.js dynamic route is [id], so we'll need to handle both or standardize.
// For public view, we usually query by slug. For admin, we query by ID.
// The data functions `getProjectBySlug` expects a slug.
// `updateProject` and `deleteProject` expect an ID.

// We will assume [id] param can be either ID or Slug for GET, but purely ID for PUT/DELETE
// Actually, for simplicity in admin, let's use ID for everything admin related.
// Public pages can fetch by slug using a query param or a dedicated endpoint if needed, 
// OR we can make a `GET /api/projects?slug=...` which is handled by the list route.
// BUT the prompt specified `/api/projects/[id]`.

// Let's refine:
// GET /api/projects/[id] -> If it looks like a slug (NaN), try slug, else ID?
// Or just strict ID for admin. 
// Public page `src/app/work/[slug]/page.tsx` likely creates a server component that calls `getProjectBySlug` directly from `@/lib/data` 
// rather than fetching via API, which is better for Next.js 14 server components.
// The API is mostly for the client-side Admin dashboard or external consumers.
// So let's stick to ID for this route to match `updateProject` and `deleteProject`.

export async function GET(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    const id = params.id;

    const { getProjects } = await import('@/lib/data'); // Dynamic import to avoid circular if any
    const projects = getProjects();
    const project = projects.find(p => p.id === id);

    if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
}

export async function PUT(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const body = await request.json();
        const updated = updateProject(params.id, body);

        if (!updated) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updated);

    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update project' },
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
        const result = deleteProject(params.id);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete project' },
            { status: 500 }
        );
    }
}
