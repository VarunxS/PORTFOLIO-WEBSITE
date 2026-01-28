import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { readData, writeData, ContactSubmission } from '@/lib/data';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validation
        const { name, email, subject, message, company } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (message.length < 50) {
            return NextResponse.json(
                { error: 'Message must be at least 50 characters' },
                { status: 400 }
            );
        }

        // Save to JSON file
        const contacts = readData<ContactSubmission>('contacts.json');
        const newContact: ContactSubmission = {
            id: Date.now().toString(),
            name,
            email,
            company: company || null,
            subject,
            message,
            status: 'new',
            createdAt: new Date().toISOString()
        };

        contacts.push(newContact);
        writeData('contacts.json', contacts);

        // Send email via Resend
        // Use the user's email as 'to' or 'reply-to'? 
        // Usually 'to' is the portfolio owner (Me).
        // The 'from' must be a verfied domain on Resend.
        // The user's input email goes into the body or reply-to.

        // For this portfolio, we send a notification TO the admin (Varun).
        const adminEmail = process.env.CONTACT_EMAIL || 'varunsingla608@gmail.com';

        await sendEmail({
            to: adminEmail,
            subject: `New Contact: ${subject}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <hr>
        <p><small>Submitted at ${new Date().toLocaleString()}</small></p>
      `
        });

        return NextResponse.json({
            success: true,
            message: 'Thank you! I\'ll respond within 24 hours.'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to submit form. Please try again.' },
            { status: 500 }
        );
    }
}
