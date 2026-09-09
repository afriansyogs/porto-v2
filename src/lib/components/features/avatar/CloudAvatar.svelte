<script lang="ts">
  import { onMount } from 'svelte';
  import { prefersReducedMotion } from '$lib/utils/motion';
  import { cn } from '$lib/utils';

  interface Props {
    class?: string;
    [key: string]: unknown;
  }

  let { class: className, ...rest }: Props = $props();

  const uid = 'cloudee-' + Math.random().toString(36).slice(2, 7);

  let containerEl: HTMLElement | null = $state(null);
  let isVisible = $state(true);
  let isHappy = $state(false);
  let isBouncing = $state(false);
  let isGlowPulse = $state(false);
  let isBlinking = $state(false);

  let targetX = 0;
  let targetY = 0;
  let currentX = $state(0);
  let currentY = $state(0);
  let floatY = $state(0);

  let tiltX = $derived(-currentY * 13);
  let tiltY = $derived(currentX * 15);
  let eyeX = $derived(currentX * 8.5);
  let eyeY = $derived(currentY * 6.5);

  let happyTimeout: number | undefined;
  let bounceTimeout: number | undefined;
  let glowTimeout: number | undefined;
  let blinkTimeout: number | undefined;
  let rafId: number | undefined;

  function triggerClickReaction() {
    if (prefersReducedMotion()) {
      isHappy = true;
      clearTimeout(happyTimeout);
      happyTimeout = window.setTimeout(() => {
        isHappy = false;
      }, 800);
      return;
    }

    clearTimeout(happyTimeout);
    clearTimeout(bounceTimeout);
    clearTimeout(glowTimeout);

    isHappy = true;
    isBouncing = true;
    isGlowPulse = true;

    bounceTimeout = window.setTimeout(() => {
      isBouncing = false;
    }, 750);

    glowTimeout = window.setTimeout(() => {
      isGlowPulse = false;
    }, 550);

    happyTimeout = window.setTimeout(() => {
      isHappy = false;
    }, 1000);
  }

  function scheduleNextBlink() {
    const delay = 2400 + Math.random() * 3000;
    blinkTimeout = window.setTimeout(() => {
      if (!isHappy) {
        isBlinking = true;
        window.setTimeout(() => {
          isBlinking = false;
          scheduleNextBlink();
        }, 130);
      } else {
        scheduleNextBlink();
      }
    }, delay);
  }

  onMount(() => {
    const reducedMotion = prefersReducedMotion();

    scheduleNextBlink();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting;
        }
      },
      { threshold: 0.1 }
    );

    if (containerEl) {
      observer.observe(containerEl);
    }

    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const handlePointerMove = (e: MouseEvent) => {
      if (!containerEl || reducedMotion || !isVisible) return;
      const rect = containerEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const maxDistX = Math.max(window.innerWidth * 0.45, 360);
      const maxDistY = Math.max(window.innerHeight * 0.45, 260);

      const dx = (e.clientX - centerX) / maxDistX;
      const dy = (e.clientY - centerY) / maxDistY;

      targetX = Math.max(-1, Math.min(1, dx));
      targetY = Math.max(-1, Math.min(1, dy));
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    if (hasHover && !reducedMotion) {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    }

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const updateLoop = (timestamp: number) => {
      if (isVisible && !reducedMotion) {
        currentX = lerp(currentX, targetX, 0.08);
        currentY = lerp(currentY, targetY, 0.08);
        floatY = Math.sin(timestamp * 0.0022) * 3.5;
      }
      rafId = requestAnimationFrame(updateLoop);
    };

    if (!reducedMotion) {
      rafId = requestAnimationFrame(updateLoop);
    }

    return () => {
      observer.disconnect();
      clearTimeout(happyTimeout);
      clearTimeout(bounceTimeout);
      clearTimeout(glowTimeout);
      clearTimeout(blinkTimeout);
      if (rafId) cancelAnimationFrame(rafId);
      if (hasHover && !reducedMotion) {
        window.removeEventListener('mousemove', handlePointerMove);
        document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      }
    };
  });
</script>

<div
  bind:this={containerEl}
  class={cn('relative inline-flex flex-col items-center justify-center select-none', className)}
  {...rest}
>
  <div
    aria-hidden="true"
    class={cn(
      'pointer-events-none absolute -inset-6 rounded-full transition-all duration-700 ease-out sm:-inset-8 md:-inset-10',
      'avatar-glow-base',
      isGlowPulse && 'avatar-glow-pulse'
    )}
  ></div>

  <div
    aria-hidden="true"
    class={cn(
      'pointer-events-none absolute -inset-10 rounded-full transition-all duration-1000 ease-out sm:-inset-14 md:-inset-18',
      'avatar-glow-diffuse',
      isGlowPulse && 'scale-125 opacity-100'
    )}
  ></div>

  <button
    type="button"
    class={cn(
      'group relative flex cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 outline-none',
      'focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background'
    )}
    onclick={triggerClickReaction}
    aria-label="Interactive Cloudee avatar, click to play"
  >
    <div
      class={cn(
        'avatar-stage relative h-28 w-36 sm:h-34 sm:w-44 md:h-36 md:w-48',
        isBouncing && 'is-bouncing'
      )}
      style:transform={`perspective(650px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(${floatY.toFixed(2)}px)`}
    >
      <svg
        viewBox="-130 -105 260 195"
        class="h-full w-full overflow-visible transition-transform duration-200 group-hover:scale-103"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="{uid}-lobe" cx="35%" cy="30%" r="65%" fx="28%" fy="22%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.96" />
            <stop offset="26%" stop-color="#e6e9ee" />
            <stop offset="62%" stop-color="#c9cbcf" />
            <stop offset="88%" stop-color="#a4a9b2" />
            <stop offset="100%" stop-color="#8e939c" />
          </radialGradient>

          <radialGradient id="{uid}-center" cx="36%" cy="28%" r="65%" fx="28%" fy="20%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.98" />
            <stop offset="28%" stop-color="#eaedf1" />
            <stop offset="65%" stop-color="#cbced4" />
            <stop offset="90%" stop-color="#a6abb4" />
            <stop offset="100%" stop-color="#9297a1" />
          </radialGradient>

          <filter id="{uid}-center-depth" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx="0"
              dy="5"
              stdDeviation="6"
              flood-color="#14171d"
              flood-opacity="0.2"
            />
          </filter>

          <filter id="{uid}-ambient" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow
              dx="0"
              dy="9"
              stdDeviation="14"
              flood-color="#000000"
              flood-opacity="0.18"
            />
          </filter>
        </defs>

        <g filter="url(#{uid}-ambient)">
          <ellipse cx="-54.21" cy="-19.98" rx="40.8" ry="40.8" fill="url(#{uid}-lobe)" />

          <ellipse cx="-64.07" cy="18.35" rx="54.32" ry="43.55" fill="url(#{uid}-lobe)" />

          <ellipse cx="41.49" cy="-37.64" rx="47.17" ry="47.17" fill="url(#{uid}-lobe)" />

          <ellipse cx="61.23" cy="18.96" rx="48.9" ry="48.42" fill="url(#{uid}-lobe)" />

          <ellipse
            cx="0"
            cy="0"
            rx="79.89"
            ry="79.89"
            fill="url(#{uid}-center)"
            filter="url(#{uid}-center-depth)"
          />
        </g>

        <g class="transition-opacity duration-300" opacity={isHappy ? 0.45 : 0}>
          <ellipse cx="-35" cy="12" rx="9" ry="5.5" fill="#ffffff" />
          <ellipse cx="35" cy="12" rx="9" ry="5.5" fill="#ffffff" />
        </g>

        <g
          class="transition-transform duration-75 ease-out"
          style:transform={`translate(${eyeX.toFixed(2)}px, ${eyeY.toFixed(2)}px)`}
          style:transform-origin="0px -1px"
        >
          {#if isHappy}
            <g class="transition-all duration-200">
              <path
                d="M -21 6 C -21 -9, -6 -9, -6 6"
                fill="none"
                stroke="#111316"
                stroke-width="6.5"
                stroke-linecap="round"
              />
              <path
                d="M 6 6 C 6 -9, 21 -9, 21 6"
                fill="none"
                stroke="#111316"
                stroke-width="6.5"
                stroke-linecap="round"
              />
            </g>
          {:else}
            <g
              class="transition-transform duration-100 ease-in-out"
              style:transform={`scaleY(${isBlinking ? 0.08 : 1})`}
              style:transform-origin="-13.38px -1.07px"
            >
              <rect x="-20.35" y="-23.78" width="13.94" height="45.42" rx="6.97" fill="#111316" />

              <circle cx="-15.5" cy="-14" r="2.2" fill="#ffffff" opacity="0.8" />
              <circle cx="-12" cy="-7.5" r="1.3" fill="#ffffff" opacity="0.45" />
            </g>

            <g
              class="transition-transform duration-100 ease-in-out"
              style:transform={`scaleY(${isBlinking ? 0.08 : 1})`}
              style:transform-origin="13.38px -1.07px"
            >
              <rect x="6.41" y="-23.78" width="13.94" height="45.42" rx="6.97" fill="#111316" />

              <circle cx="11.2" cy="-14" r="2.2" fill="#ffffff" opacity="0.8" />
              <circle cx="14.7" cy="-7.5" r="1.3" fill="#ffffff" opacity="0.45" />
            </g>
          {/if}
        </g>
      </svg>
    </div>
  </button>
</div>

<style>
  .avatar-stage {
    transform-style: preserve-3d;
    will-change: transform;
  }

  .avatar-glow-base {
    background: radial-gradient(
      circle at 50% 50%,
      oklch(0 0 0 / 7%) 0%,
      oklch(0 0 0 / 3%) 45%,
      transparent 72%
    );
    filter: blur(28px);
    opacity: 0.8;
  }

  :global(.dark) .avatar-glow-base {
    background: radial-gradient(
      circle at 50% 50%,
      oklch(1 0 0 / 22%) 0%,
      oklch(1 0 0 / 8%) 45%,
      transparent 72%
    );
    filter: blur(32px);
    opacity: 0.95;
  }

  .avatar-glow-diffuse {
    background: radial-gradient(circle at 50% 50%, oklch(0 0 0 / 3.5%) 0%, transparent 65%);
    filter: blur(48px);
    opacity: 0.6;
  }

  :global(.dark) .avatar-glow-diffuse {
    background: radial-gradient(circle at 50% 50%, oklch(1 0 0 / 10%) 0%, transparent 65%);
    filter: blur(52px);
    opacity: 0.75;
  }

  .avatar-glow-pulse {
    transform: scale(1.35);
    opacity: 1 !important;
    transition-duration: 200ms !important;
  }

  .is-bouncing {
    animation: cloudee-bounce 720ms cubic-bezier(0.28, 0.84, 0.42, 1);
  }

  @keyframes cloudee-bounce {
    0% {
      transform: scale(1, 1);
    }
    20% {
      transform: scale(1.18, 0.82) translateY(5px);
    }
    45% {
      transform: scale(0.88, 1.15) translateY(-14px);
    }
    68% {
      transform: scale(1.06, 0.95) translateY(2px);
    }
    85% {
      transform: scale(0.98, 1.02) translateY(-1px);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .avatar-stage {
      transform: none !important;
      animation: none !important;
    }
    .is-bouncing {
      animation: none !important;
    }
    .avatar-glow-base,
    .avatar-glow-diffuse {
      transition: none !important;
    }
  }
</style>
