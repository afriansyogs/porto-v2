<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Attachment } from 'svelte/attachments';
  import { resolve } from '$app/paths';
  import { cn } from '$lib/utils';
  import { prefersReducedMotion } from '$lib/utils/motion';

  type ResolveHref = Parameters<typeof resolve>[0];

  interface Props {
    href?: ResolveHref;
    type?: 'button' | 'submit';
    variant?: 'primary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    class?: string;
    onclick?: (event: MouseEvent) => void;
    children: Snippet;
  }

  let {
    href,
    type = 'button',
    variant = 'primary',
    size = 'md',
    disabled = false,
    class: className,
    onclick,
    children
  }: Props = $props();

  const shine: Attachment<HTMLElement> = (element) => {
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
        element.style.setProperty('--bx', `${event.clientX - rect.left}px`);
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

  const classes = $derived(
    cn(
      'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium whitespace-nowrap',
      'transition-[scale,translate,background-color,border-color,opacity] duration-[var(--dur-micro)] ease-[var(--ease-signature)]',
      'hover:-translate-y-px active:translate-y-0 active:scale-[0.98]',
      'focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
      variant === 'primary'
        ? 'bg-primary text-primary-foreground'
        : 'border border-border text-foreground hover:bg-accent',
      size === 'sm' && 'h-8 px-4 text-xs',
      size === 'md' && 'h-10 px-5 text-sm',
      size === 'lg' && 'h-12 px-7 text-base',
      disabled && 'pointer-events-none opacity-50',
      className
    )
  );
</script>

{#snippet inner()}
  <span
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--dur-base)] ease-[var(--ease-signature)] group-hover:opacity-20"
    style="background: radial-gradient(140px circle at var(--bx, 50%) 50%, currentColor, transparent 70%)"
  ></span>
  <span class="relative">{@render children()}</span>
{/snippet}

{#if href !== undefined}
  <a
    href={resolve(href)}
    {onclick}
    class={classes}
    aria-disabled={disabled || undefined}
    {@attach shine}
  >
    {@render inner()}
  </a>
{:else}
  <button {type} {disabled} {onclick} class={classes} {@attach shine}>
    {@render inner()}
  </button>
{/if}
