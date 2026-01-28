import { getProjects, getCaseStudies, readData } from '@/lib/data';
import { ContactSubmission } from '@/lib/data';
import { Card } from '@/components/ui/Base';
import Link from 'next/link';
import {
    FolderOpen,
    FileText,
    Mail,
    ArrowRight,
    Eye,
    Clock
} from 'lucide-react';

export default function AdminDashboard() {
    const projects = getProjects();
    const caseStudies = getCaseStudies();
    // We need to read contacts. 
    // Contact helper wasn't strictly exported as `getContacts` in `lib/data` yet, 
    // but we have generic `readData`.
    // Let's assume we can use `readData` here or add helper.
    // I will use `readData` directly since it is a server component.

    let contacts: ContactSubmission[] = [];
    try {
        contacts = readData<ContactSubmission>('contacts.json');
    } catch (e) {
        contacts = [];
    }

    const stats = [
        { label: 'Total Projects', value: projects.length, icon: FolderOpen, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Case Studies', value: caseStudies.length, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'New Messages', value: contacts.filter(c => c.status === 'new').length, icon: Mail, color: 'text-green-600', bg: 'bg-green-100' },
    ];

    const recentContacts = contacts
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-heading text-3xl font-bold text-navy-900">Dashboard</h1>
                <p className="text-gray-500">Welcome back, Varun.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.label} className="flex items-center p-6">
                            <div className={`p-4 rounded-full ${stat.bg} ${stat.color} mr-4`}>
                                <Icon size={24} />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                <p className="text-3xl font-bold text-navy-900">{stat.value}</p>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Recent Contact Submissions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <h2 className="font-heading text-lg font-bold text-navy-900">Recent Messages</h2>
                    <Link href="/admin/contacts" className="text-sm text-gold-600 hover:text-gold-700 font-medium flex items-center">
                        View All <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>

                {recentContacts.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {recentContacts.map((contact) => (
                            <div key={contact.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center">
                                        <span className={`w-2 h-2 rounded-full mr-2 ${contact.status === 'new' ? 'bg-green-500' : 'bg-gray-300'}`} />
                                        <h3 className="font-medium text-navy-900">{contact.name}</h3>
                                        {contact.company && <span className="text-gray-400 text-sm ml-2">({contact.company})</span>}
                                    </div>
                                    <div className="flex items-center text-xs text-gray-400">
                                        <Clock size={12} className="mr-1" />
                                        {new Date(contact.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <p className="text-sm font-medium text-gray-700">{contact.subject}</p>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-1">{contact.message}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        No messages yet.
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-heading text-lg font-bold text-navy-900 mb-4">Quick Links</h3>
                    <div className="space-y-3">
                        <Link href="/admin/projects" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-sm font-medium text-gray-700">
                            Manage Projects
                        </Link>
                        <Link href="/admin/case-studies" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-sm font-medium text-gray-700">
                            Manage Case Studies
                        </Link>
                        <Link href="/" target="_blank" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-sm font-medium text-gray-700 flex justify-between">
                            <span>View Live Site</span>
                            <Eye size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
