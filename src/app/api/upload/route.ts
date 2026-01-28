import { NextResponse } from 'next/server';
import { uploadFile } from '@/lib/upload';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // File size validation (5MB for images, 10MB for PDFs as per plan)
        const maxSize = file.type.startsWith('image/') ? 5 : 10;
        if (file.size > maxSize * 1024 * 1024) {
            return NextResponse.json(
                { error: `File too large. Max ${maxSize}MB` },
                { status: 400 }
            );
        }

        // File type validation
        const allowedTypes = [
            'image/jpeg', 'image/png', 'image/webp',
            'application/pdf'
        ];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Only Images and PDFs are allowed.' },
                { status: 400 }
            );
        }

        // Upload
        const url = await uploadFile(file, file.name);

        return NextResponse.json({ url });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Upload failed' },
            { status: 500 }
        );
    }
}
