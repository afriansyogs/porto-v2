<script lang="ts">
  import { cn } from '$lib/utils';

  interface Props {
    src?: string;
    alt?: string;
    class?: string;
  }

  let {
    src = '/about.webp',
    alt = 'Afrians Yoga — Fullstack Developer & AI/ML Enthusiast',
    class: className
  }: Props = $props();
</script>

<figure
  class={cn(
    'group relative overflow-hidden rounded-lg border border-border bg-foreground/[0.03]',
    className
  )}
>
  <img
    {src}
    {alt}
    width="736"
    height="736"
    loading="lazy"
    decoding="async"
    class="block aspect-square w-full object-cover contrast-[1.06] grayscale transition-all duration-500 ease-out group-hover:scale-102 group-hover:grayscale-0"
  />

  <div
    aria-hidden="true"
    class="dither-overlay pointer-events-none absolute inset-0 transition-opacity duration-500 group-hover:opacity-30"
  ></div>

  <figcaption class="sr-only">{alt}</figcaption>
</figure>

<style>
  .dither-overlay {
    background-image: radial-gradient(circle, currentColor 1px, transparent 1.2px);
    background-size: 4px 4px;
    color: var(--foreground);
    opacity: 0.18;
    mix-blend-mode: overlay;
  }

  @media (prefers-reduced-motion: reduce) {
    img,
    .dither-overlay {
      transition: none !important;
    }
  }
</style>
