import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Please enter your name.' })
    .max(80, { message: 'Name must be 80 characters or fewer.' }),
  email: z
    .email({ message: 'Please enter a valid email address.' })
    .max(160, { message: 'Email must be 160 characters or fewer.' }),
  message: z
    .string()
    .min(10, { message: 'Please write at least 10 characters.' })
    .max(2000, { message: 'Message must be 2000 characters or fewer.' })
});

export type ContactInput = z.infer<typeof contactSchema>;

export interface ContactFieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export type ContactActionResult =
  { status: 'success' } | { status: 'error'; message: string; fieldErrors?: ContactFieldErrors };

const isFieldKey = (value: string): value is keyof ContactFieldErrors =>
  value === 'name' || value === 'email' || value === 'message';

export function toFieldErrors(error: z.ZodError): ContactFieldErrors {
  const result: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && isFieldKey(key) && result[key] === undefined) {
      result[key] = issue.message;
    }
  }
  return result;
}
