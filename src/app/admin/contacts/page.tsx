import { readData, ContactSubmission } from '@/lib/data';
import { Mail, Phone, Calendar, Loader2 } from 'lucide-react';

export default function AdminContactsPage() {
    let contacts: ContactSubmission[] = [];
    try {
        contacts = readData<ContactSubmission>('contacts.json');
    } catch (error) {
        contacts = [];
    }

    // Sort by newest
    contacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div>
            <h1 className="font-heading text-3xl font-bold text-navy-900 mb-8">Messages</h1>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {contacts.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        No messages yet.
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {contacts.map((contact) => (
                            <div key={contact.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex flex-col md:flex-row justify-between mb-4">
                                    <div className="flex items-start">
                                        <div className={`mt-1.5 w-2.5 h-2.5 rounded-full mr-3 ${contact.status === 'new' ? 'bg-green-500' : 'bg-gray-300'}`} />
                                        <div>
                                            <h3 className="font-bold text-lg text-navy-900">{contact.name}</h3>
                                            <div className="text-sm text-gray-500 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-1">
                                                <span className="flex items-center"><Mail size={14} className="mr-1" /> {contact.email}</span>
                                                {contact.company && <span className="font-medium text-navy-600">{contact.company}</span>}
                                                <span className="flex items-center"><Calendar size={14} className="mr-1" /> {new Date(contact.createdAt).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 px-3 py-1 bg-gray-100 rounded text-xs text-gray-600 font-mono h-fit">
                                        ID: {contact.id}
                                    </div>
                                </div>

                                <div className="pl-6">
                                    <h4 className="font-medium text-navy-800 mb-2">{contact.subject}</h4>
                                    <p className="text-gray-600 whitespace-pre-wrap text-sm leading-relaxed bg-gray-50 p-4 rounded-md border border-gray-100">
                                        {contact.message}
                                    </p>
                                </div>

                                {/* Could add action buttons here like 'Mark as Read', 'Reply' (mailto) */}
                                <div className="pl-6 mt-4 pt-4 border-t border-gray-100 flex gap-4">
                                    <a href={`mailto:${contact.email}?subject=Re: ${contact.subject}`} className="text-sm font-medium text-gold-600 hover:text-gold-700">
                                        Reply via Email
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
