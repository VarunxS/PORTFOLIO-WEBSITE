import { getCaseStudies } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/Base';
import { Plus, Edit } from 'lucide-react';
import Image from 'next/image';

export default function AdminCaseStudiesPage() {
    const studies = getCaseStudies();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-heading text-3xl font-bold text-navy-900">Case Studies</h1>
                <Link href="/admin/case-studies/new">
                    <Button icon={<Plus size={18} />}>Add Case Study</Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium text-sm">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Client</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Featured</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {studies.map((study) => (
                            <tr key={study.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-navy-900">{study.title}</div>
                                    <div className="text-xs text-gray-400">{study.industry}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {study.client}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${study.status === 'published'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {study.status.charAt(0).toUpperCase() + study.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {study.featured ? (
                                        <span className="bg-gold-100 text-gold-700 px-2 py-1 rounded-full text-xs font-bold">Featured</span>
                                    ) : <span className="text-gray-400 text-xs">-</span>}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                        <Link href={`/admin/case-studies/${study.id}`}>
                                            <button className="p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-blue-600 transition-colors">
                                                <Edit size={16} />
                                            </button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {studies.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No case studies found. Create your first one.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
