import { getProjects } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/Base';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function AdminProjectsPage() {
    const projects = getProjects();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-heading text-3xl font-bold text-navy-900">Projects</h1>
                <Link href="/admin/projects/new">
                    <Button icon={<Plus size={18} />}>Add Project</Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium text-sm">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {projects.map((project) => (
                            <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-navy-900">{project.title}</div>
                                    <div className="text-xs text-gray-400">{project.slug}</div>
                                </td>
                                <td className="px-6 py-4">
                                    {project.imageUrl ? (
                                        <div className="w-12 h-12 relative rounded overflow-hidden">
                                            <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                                            N/A
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {project.category}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.status === 'published'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                        <Link href={`/admin/projects/${project.id}`}>
                                            <button className="p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-blue-600 transition-colors">
                                                <Edit size={16} />
                                            </button>
                                        </Link>
                                        {/* Delete button usually needs client interaction or a separate client component for handling deletes */}
                                        {/* For simplicity we will implement delete inside the Edit page or make this a client component. 
                        Since this is a server component, we can use a client component wrapper for the delete button. 
                        Wait, this IS a server component. We can't attach onClick.
                        We'll just leave Delete action for inside the Edit page for now or make this page client side?
                        Let's make this page client side for interaction? No, better server side + client buttons. 
                        I'll just link to Edit where Delete is available. */}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No projects found. Create your first one.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
