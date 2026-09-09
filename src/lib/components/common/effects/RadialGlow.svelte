<script lang="ts">
  import type { Attachment } from 'svelte/attachments';
  import { prefersReducedMotion } from '$lib/utils/motion';

  import { cn } from '$lib/utils';

  interface Props {
    followCursor?: boolean;
    masked?: boolean;
    class?: string;
  }

  let { followCursor = false, masked = true, class: className }: Props = $props();

  const cursorGlow: Attachment<HTMLDivElement> = (element) => {
    const target = element.parentElement;
    if (
      target === null ||
      prefersReducedMotion() ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return;
    }
    let frame = 0;

    const onPointerMove = (event: PointerEvent): void => {
      if (frame !== 0) {
        return;
      }
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = target.getBoundingClientRect();
        element.style.setProperty('--x', `${event.clientX - rect.left}px`);
        element.style.setProperty('--y', `${event.clientY - rect.top}px`);
      });
    };

    target.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      target.removeEventListener('pointermove', onPointerMove);
      if (frame !== 0) {
        cancelAnimationFrame(frame);
      }
    };
  };
</script>

<div
  aria-hidden="true"
  class={cn(
    'pointer-events-none absolute inset-0 glow-radial',
    masked && 'grid-mask-radial',
    className
  )}
  {@attach followCursor && cursorGlow}
></div>
