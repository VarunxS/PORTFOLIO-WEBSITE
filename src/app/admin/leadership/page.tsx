import { getLeadership } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/Base';
import { Plus, Edit } from 'lucide-react';

export default function AdminLeadershipPage() {
    const positions = getLeadership();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-heading text-3xl font-bold text-navy-900">Leadership & Experience</h1>
                <Link href="/admin/leadership/new">
                    <Button icon={<Plus size={18} />}>Add Position</Button>
                </Link>
            </div>

            <div className="bg-white border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium text-sm border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Organization</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Timeline</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {positions.map((pos) => (
                            <tr key={pos.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-navy-900">
                                    {pos.title}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {pos.organization}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs uppercase tracking-wider bg-gray-100 px-2 py-1 rounded">
                                        {pos.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                                    {new Date(pos.startDate).getFullYear()} - {pos.current ? 'Present' : (pos.endDate ? new Date(pos.endDate).getFullYear() : '')}
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`/admin/leadership/${pos.id}`}>
                                        <button className="p-2 hover:bg-gray-200 rounded text-gray-600 transition-colors">
                                            <Edit size={16} />
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {positions.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No positions found. Add your experience.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
