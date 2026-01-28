'use client';

import { LeadershipForm } from '@/components/admin/LeadershipForm';
import { Button, LoadingSpinner } from '@/components/ui/Base';
import { Trash2 } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LeadershipPosition } from '@/lib/data';

export default function EditLeadershipPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [position, setPosition] = useState<LeadershipPosition | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPositions = async () => {
            if (!id) return;

            try {
                const res = await fetch(`/api/leadership/${id}`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setPosition(data);
            } catch (err) {
                console.error(err);
                // Don't redirect immediately to allow debugging errors
            } finally {
                setLoading(false);
            }
        };

        fetchPositions();
    }, [id]);

    const handleDelete = async () => {
        if (!confirm('Delete this position?')) return;

        try {
            const res = await fetch(`/api/leadership/${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) throw new Error('Failed to delete');

            router.push('/admin/leadership');
            router.refresh();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    if (loading) return <div className="h-64 flex items-center justify-center"><LoadingSpinner /></div>;
    if (!position) return <div className="p-8">Position not found.</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-heading text-3xl font-bold text-navy-900">Edit Position</h1>
                <Button
                    variant="outline"
                    onClick={handleDelete}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    icon={<Trash2 size={16} />}
                >
                    Delete
                </Button>
            </div>
            <LeadershipForm initialData={position} />
        </div>
    );
}
