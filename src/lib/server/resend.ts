import { env } from '$env/dynamic/private';
import type { ContactInput } from '$lib/schemas/contact';

export async function sendContactEmail(input: ContactInput): Promise<void> {
  const apiKey = env.RESEND_API_KEY;
  const receiver = env.CONTACT_RECEIVER_EMAIL;
  const sender = env.CONTACT_SENDER_EMAIL;

  if (!apiKey || !receiver || !sender) {
    throw new Error('Contact email is not configured on the server.');
  }

  const text = [`Name: ${input.name}`, `Email: ${input.email}`, '', input.message].join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: `Portfolio Contact Form <${sender}>`,
      to: [receiver],
      reply_to: input.email,
      subject: `Portfolio contact from ${input.name}`,
      text
    })
  });

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 200);
    throw new Error(`Resend API responded ${response.status}: ${detail}`);
  }
}
