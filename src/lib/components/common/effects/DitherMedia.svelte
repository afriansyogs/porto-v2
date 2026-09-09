<script lang="ts">
  import { cn } from '$lib/utils';

  interface Props {
    src?: string;
    alt?: string;
    label: string;
    class?: string;
  }

  let { src, alt, label, class: className }: Props = $props();
</script>

<div
  class={cn(
    'relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-foreground/[0.03]',
    className
  )}
>
  {#if src}
    <img
      {src}
      alt={alt ?? label}
      loading="lazy"
      decoding="async"
      class="h-full w-full object-cover object-top transition-transform duration-[var(--dur-slow)] ease-[var(--ease-signature)] group-hover:scale-[1.03]"
    />
  {:else}
    <div aria-hidden="true" class="dither-dots absolute inset-0"></div>
    <p
      class="relative font-mono text-[0.6875rem] tracking-[0.08em] text-muted-foreground uppercase"
    >
      {label}
    </p>
  {/if}
</div>

<style>
  .dither-dots {
    background-image: radial-gradient(circle, currentColor 1px, transparent 1.4px);
    background-size: 6px 6px;
    color: var(--foreground);
    opacity: 0.16;
    mask-image: linear-gradient(to bottom, transparent 5%, black 95%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 5%, black 95%);
  }

  @media (prefers-reduced-motion: reduce) {
    img {
      transition: none !important;
    }
  }
</style>
