'use client';

import { CaseStudyForm } from '@/components/admin/CaseStudyForm';
import { Button } from '@/components/ui/Base';
import { Trash2 } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CaseStudy } from '@/lib/data';
import { LoadingSpinner } from '@/components/ui/Base';

export default function EditCaseStudyPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [study, setStudy] = useState<CaseStudy | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudy = async () => {
            if (!id) return;

            try {
                const res = await fetch(`/api/case-studies/${id}`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setStudy(data);
            } catch (err) {
                console.error(err);
                router.push('/admin/case-studies');
            } finally {
                setLoading(false);
            }
        };

        fetchStudy();
    }, [id, router]);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this case study?')) return;

        try {
            const res = await fetch(`/api/case-studies/${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) throw new Error('Failed to delete');

            router.push('/admin/case-studies');
            router.refresh();
        } catch (err) {
            alert('Failed to delete case study');
        }
    };

    if (loading) return <div className="h-64 flex items-center justify-center"><LoadingSpinner /></div>;
    if (!study) return <div>Case Study not found</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-heading text-3xl font-bold text-navy-900">Edit Case Study</h1>
                <Button
                    variant="outline"
                    onClick={handleDelete}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    icon={<Trash2 size={16} />}
                >
                    Delete Case Study
                </Button>
            </div>
            <CaseStudyForm initialData={study} />
        </div>
    );
}
