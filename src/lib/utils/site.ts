import { PUBLIC_SITE_URL } from '$env/static/public';

const FALLBACK = 'https://afriansyoga.example.com';

export const SITE_URL = (PUBLIC_SITE_URL ?? FALLBACK).replace(/\/+$/, '');
