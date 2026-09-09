import { PUBLIC_SITE_URL } from '$env/static/public';

const FALLBACK = 'https://afriansyoga.vercel.app';

export const SITE_URL = (PUBLIC_SITE_URL ?? FALLBACK).replace(/\/+$/, '');
