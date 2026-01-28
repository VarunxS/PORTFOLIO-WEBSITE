'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/Base';
import { Upload, X, FileText, CheckCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface FileUploadProps {
    accept?: string;
    maxSizeMB?: number; // MB
    currentFile?: string;
    onUpload: (url: string) => void;
    label?: string;
    className?: string;
}

export const FileUpload = ({
    accept = "image/*",
    maxSizeMB = 5,
    currentFile,
    onUpload,
    label = "Upload File",
    className
}: FileUploadProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const [preview, setPreview] = useState<string | null>(currentFile || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = async (file: File) => {
        setError('');

        // Check size
        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`File is too large. Max ${maxSizeMB}MB.`);
            return;
        }

        // Check type (simple check)
        // accept="image/*" -> startsWith('image/')
        if (accept === 'image/*' && !file.type.startsWith('image/')) {
            setError('Only image files are allowed');
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            setPreview(data.url);
            onUpload(data.url);
        } catch (err) {
            setError('Failed to upload file. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const clearFile = () => {
        setPreview(null);
        onUpload('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={cn("w-full", className)}>
            {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}

            {!preview ? (
                <div
                    className={cn(
                        "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
                        isDragging ? "border-gold-500 bg-gold-50" : "border-gray-300 hover:border-gold-500 hover:bg-gray-50",
                        error ? "border-red-300 bg-red-50" : ""
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept={accept}
                        onChange={handleFileSelect}
                    />

                    {isUploading ? (
                        <div className="flex flex-col items-center text-gray-500">
                            <Loader2 className="h-8 w-8 animate-spin mb-2 text-gold-500" />
                            <p>Uploading...</p>
                        </div>
                    ) : (
                        <>
                            <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                            <p className="text-gray-600 font-medium mb-1">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-gray-400 text-xs">
                                {accept === 'image/*' ? 'PNG, JPG, WEBP' : 'PDF, DOC'} (Max {maxSizeMB}MB)
                            </p>
                        </>
                    )}
                </div>
            ) : (
                <div className="relative border border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center">
                    <div className="h-16 w-16 relative flex-shrink-0 bg-gray-200 rounded overflow-hidden mr-4">
                        {accept === 'image/*' || preview.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                            <Image
                                src={preview}
                                alt="Uploaded file"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-500">
                                <FileText />
                            </div>
                        )}
                    </div>
                    <div className="flex-grow overflow-hidden">
                        <p className="text-sm font-medium text-gray-900 truncate">File uploaded successfully</p>
                        <a href={preview} target="_blank" rel="noopener noreferrer" className="text-xs text-gold-600 hover:underline truncate block">
                            {preview}
                        </a>
                    </div>
                    <button
                        type="button"
                        onClick={clearFile}
                        className="text-gray-400 hover:text-red-500 p-2"
                    >
                        <X size={20} />
                    </button>
                </div>
            )}

            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
    );
};
