import { Resend } from 'resend';

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
    from?: string;
}

export async function sendEmail({
    to,
    subject,
    html,
    from = 'Portfolio <noreply@varunsingla.com>'
}: SendEmailParams) {
    // If no API key is set (e.g. dev without env), we log instead of failing hard
    if (!process.env.RESEND_API_KEY) {
        console.log('--- MOCK EMAIL SEND ---');
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log('--- END MOCK EMAIL ---');
        return { id: 'mock-email-id' };
    }

    try {
        const { data, error } = await resend.emails.send({
            from,
            to: [to],
            subject,
            html,
        });

        if (error) {
            console.error('Email service error:', error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
}
