const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export const MOTION = {
  durationMicro: 0.15,
  durationBase: 0.3,
  durationSlow: 0.5,
  durationStage: 0.8,
  staggerDefault: 0.08,
  easeSignature: 'power3.out'
} as const;
