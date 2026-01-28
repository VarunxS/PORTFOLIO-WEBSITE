import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', loading, icon, iconPosition = 'left', fullWidth, children, disabled, ...props }, ref) => {

        const variants = {
            primary: 'bg-navy-900 text-white hover:bg-navy-800 shadow-sm border border-transparent',
            secondary: 'bg-gray-100 text-navy-900 hover:bg-gray-200 border border-gray-200',
            outline: 'bg-transparent border border-navy-900 text-navy-900 hover:bg-gray-50',
            ghost: 'text-navy-900 hover:bg-gray-100',
        };

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg',
        };

        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={cn(
                    'inline-flex items-center justify-center rounded-none font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-900',
                    variants[variant],
                    sizes[size],
                    fullWidth && 'w-full',
                    disabled && 'opacity-50 cursor-not-allowed',
                    className
                )}
                {...props}
            >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!loading && icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
                {children}
                {!loading && icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
            </button>
        );
    }
);
Button.displayName = 'Button';

// --- Card ---
interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'highlighted';
    hover?: boolean;
    className?: string;
    onClick?: () => void;
}

export const Card = ({ children, variant = 'default', hover = false, className, onClick }: CardProps) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                'bg-white p-6 border',
                variant === 'default' ? 'border-gray-200 shadow-sm' : 'border-navy-900 bg-gray-50',
                hover && 'hover:border-navy-500 transition-colors cursor-pointer',
                className
            )}
        >
            {children}
        </div>
    );
};

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, fullWidth = true, ...props }, ref) => {
        return (
            <div className={cn('mb-4', fullWidth ? 'w-full' : '')}>
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1 font-body">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={cn(
                        'w-full px-4 py-2 rounded-none border border-gray-300 focus:outline-none focus:border-navy-900 focus:ring-1 focus:ring-navy-900 transition-shadow font-body',
                        error && 'border-error ring-1 ring-error/20',
                        className
                    )}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-error">{error}</p>}
            </div>
        );
    }
);
Input.displayName = 'Input';

// --- Textarea ---
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, fullWidth = true, ...props }, ref) => {
        return (
            <div className={cn('mb-4', fullWidth ? 'w-full' : '')}>
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1 font-body">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={cn(
                        'w-full px-4 py-2 rounded-none border border-gray-300 focus:outline-none focus:border-navy-900 focus:ring-1 focus:ring-navy-900 transition-shadow font-body',
                        error && 'border-error ring-1 ring-error/20',
                        className
                    )}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-error">{error}</p>}
            </div>
        );
    }
);
Textarea.displayName = 'Textarea';

// --- LoadingSpinner ---
export const LoadingSpinner = ({ className }: { className?: string }) => (
    <div className={cn("flex justify-center items-center", className)}>
        <Loader2 className="animate-spin text-navy-900 h-8 w-8" />
    </div>
);
