import { put } from '@vercel/blob';
import path from 'path';
import fs from 'fs';
import { writeFile, mkdir } from 'fs/promises';

export async function uploadFile(file: File, filename: string) {
    // Check if Vercel Blob is configured
    if (process.env.BLOB_READ_WRITE_TOKEN) {
        try {
            const blob = await put(filename, file, {
                access: 'public',
                addRandomSuffix: true,
            });
            return blob.url;
        } catch (error) {
            console.error('Error uploading to Vercel Blob:', error);
            throw error;
        }
    }

    // Local Fallback
    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure public/uploads exists
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });

        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(filename);
        const basename = path.basename(filename, ext);
        const uniqueFilename = `${basename}-${uniqueSuffix}${ext}`;

        const filePath = path.join(uploadDir, uniqueFilename);

        await writeFile(filePath, buffer);

        // Return local URL
        // Note: In production without Blob, this won't persist across deployments usually,
        // but it works for local dev or VPS with persistent disk.
        return `/uploads/${uniqueFilename}`;
    } catch (error) {
        console.error('Error saving file locally:', error);
        throw new Error('Failed to upload file');
    }
}
