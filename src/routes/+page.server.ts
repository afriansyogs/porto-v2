import { contactSchema, toFieldErrors, type ContactActionResult } from '$lib/schemas/contact';
import { sendContactEmail } from '$lib/server/resend';
import type { Actions } from './$types';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const MAX_TRACKED_IPS = 500;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > MAX_TRACKED_IPS) {
    for (const [ip, timestamps] of hits) {
      if (timestamps.every((at) => now - at >= WINDOW_MS)) {
        hits.delete(ip);
      }
    }
  }
  return false;
}

export const actions = {
  send: async ({ request, getClientAddress }): Promise<ContactActionResult> => {
    const data = await request.formData();

    if (String(data.get('company') ?? '') !== '') {
      return { status: 'success' };
    }

    if (isRateLimited(getClientAddress())) {
      return {
        status: 'error',
        message:
          'Too many messages from your address — try again in a few minutes, or email me directly.'
      };
    }

    const parsed = contactSchema.safeParse({
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim()
    });
    if (!parsed.success) {
      return {
        status: 'error',
        message: 'Please check the highlighted fields.',
        fieldErrors: toFieldErrors(parsed.error)
      };
    }

    try {
      await sendContactEmail(parsed.data);
    } catch {
      return {
        status: 'error',
        message: 'The message could not be sent right now — please email me directly.'
      };
    }
    return { status: 'success' };
  }
} satisfies Actions;
