'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FolderOpen,
    FileText,
    Award,
    Mail,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
    { name: 'Case Studies', href: '/admin/case-studies', icon: FileText },
    { name: 'Leadership', href: '/admin/leadership', icon: Award },
    { name: 'Contacts', href: '/admin/contacts', icon: Mail },
];

export const AdminSidebar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Close sidebar on navigate on mobile
    const handleClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile Toggle */}
            <div className="fixed top-0 left-0 right-0 bg-navy-900 text-white p-4 flex items-center justify-between md:hidden z-50 shadow-md">
                <span className="font-heading text-xl">Admin Panel</span>
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar Container */}
            <aside className={cn(
                "fixed inset-y-0 left-0 bg-navy-900 text-cream-50 w-64 transform transition-transform duration-300 ease-in-out z-40 md:translate-x-0 pt-16 md:pt-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-full flex flex-col">
                    {/* Logo Area */}
                    <div className="p-8 border-b border-navy-800 hidden md:block">
                        <h1 className="font-heading text-2xl font-bold text-white">Varun Singla</h1>
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Admin Dashboard</p>
                    </div>

                    {/* Nav Items */}
                    <div className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={handleClick}
                                    className={cn(
                                        "flex items-center px-4 py-3 rounded-md transition-colors group",
                                        isActive
                                            ? "bg-gold-500 text-navy-900 font-medium"
                                            : "text-gray-300 hover:bg-navy-800 hover:text-white"
                                    )}
                                >
                                    <Icon size={20} className={cn("mr-3", isActive ? "text-navy-900" : "text-gray-400 group-hover:text-white")} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Logout */}
                    <div className="p-4 border-t border-navy-800">
                        <button className="flex items-center w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-navy-800 rounded-md transition-all">
                            <LogOut size={20} className="mr-3" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};
