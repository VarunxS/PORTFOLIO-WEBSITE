'use client';

import { ProjectForm } from '@/components/admin/ProjectForm';
import { Button } from '@/components/ui/Base';
import { Trash2 } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Project } from '@/lib/data';
import { LoadingSpinner } from '@/components/ui/Base';

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams(); // Use hook instead of props
    const id = params.id as string;

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch project data
        const fetchProject = async () => {
            if (!id) return;

            try {
                const res = await fetch(`/api/projects/${id}`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setProject(data);
            } catch (err) {
                console.error(err);
                router.push('/admin/projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id, router]);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) throw new Error('Failed to delete');

            router.push('/admin/projects');
            router.refresh();
        } catch (err) {
            alert('Failed to delete project');
        }
    };

    if (loading) return <div className="h-64 flex items-center justify-center"><LoadingSpinner /></div>;
    if (!project) return <div>Project not found</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-heading text-3xl font-bold text-navy-900">Edit Project</h1>
                <Button
                    variant="outline"
                    onClick={handleDelete}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    icon={<Trash2 size={16} />}
                >
                    Delete Project
                </Button>
            </div>
            <ProjectForm initialData={project} />
        </div>
    );
}
