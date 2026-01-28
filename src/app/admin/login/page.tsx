'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components/ui/Base';
import { Lock, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('admin@varunsingla.com'); // Default for demo
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error('Invalid credentials');
            }

            router.push('/admin');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-100 rounded-full mb-4 text-navy-900">
                        <Lock size={32} />
                    </div>
                    <h1 className="font-heading text-2xl font-bold text-navy-900">Admin Access</h1>
                    <p className="text-gray-500 text-sm mt-2">Enter your credentials to continue</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded text-sm flex items-center mb-6">
                        <AlertCircle size={16} className="mr-2" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <Input
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        fullWidth
                        loading={loading}
                        className="mt-2"
                    >
                        Sign In
                    </Button>
                </form>

                <div className="mt-8 text-center text-xs text-gray-400">
                    Only authorized personnel allowed.
                </div>
            </div>
        </div>
    );
}
