import { AdminSidebar } from '@/components/admin/Sidebar';
import { Inter } from 'next/font/google';

// We need to fetch fonts again here if layout resets root, but root layout applies fonts.
// However, Admin layout is nested inside Root Layout or is it a separate route group?
// `src/app/layout.tsx` applies to everything. 
// So fonts from RootLayout are inherited.
// We just need to add the sidebar structure.

export const metadata = {
    title: 'Admin Dashboard | Varun Singla',
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100">
            <AdminSidebar />
            <div className="md:ml-64 min-h-screen flex flex-col pt-16 md:pt-0">
                <main className="flex-1 p-8 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
