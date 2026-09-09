<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Attachment } from 'svelte/attachments';
  import { cn } from '$lib/utils';
  import { prefersReducedMotion } from '$lib/utils/motion';

  interface Props {
    class?: string;
    children: Snippet;
  }

  let { class: className, children }: Props = $props();

  const spotlight: Attachment<HTMLDivElement> = (element) => {
    if (
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
        const rect = element.getBoundingClientRect();
        element.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        element.style.setProperty('--my', `${event.clientY - rect.top}px`);
      });
    };

    element.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      element.removeEventListener('pointermove', onPointerMove);
      if (frame !== 0) {
        cancelAnimationFrame(frame);
      }
    };
  };
</script>

<div
  class={cn('group relative flex flex-col overflow-hidden rounded-[10px] glass', className)}
  {@attach spotlight}
>
  <span
    aria-hidden="true"
    class="spotlight pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-[var(--dur-base)] ease-[var(--ease-signature)] group-hover:opacity-100"
  ></span>
  {@render children()}
</div>

<style>
  .spotlight {
    background: radial-gradient(
      420px circle at var(--mx, 50%) var(--my, 50%),
      oklch(1 0 0 / 8%),
      transparent 60%
    );
  }
</style>
