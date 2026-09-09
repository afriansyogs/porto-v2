<script lang="ts">
  import type { Snippet } from 'svelte';
  import GridBackground from './effects/GridBackground.svelte';

  interface Props {
    id: string;
    index: string;
    title: string;
    lead?: string;

    background?: Snippet;
    children: Snippet;
  }

  let { id, index, title, lead, background, children }: Props = $props();

  const headingId = $derived(`${id}-title`);
  const label = $derived(`${index} / ${id.toUpperCase()}`);
</script>

<section
  {id}
  aria-labelledby={headingId}
  class="relative scroll-mt-6 overflow-x-clip py-24 md:scroll-mt-28 md:py-32 xl:py-36"
>
  {#if background !== undefined}
    {@render background()}
  {:else}
    <GridBackground masked />
  {/if}
  <div class="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-8">
    <header class="mb-12 md:mb-16">
      <p class="font-mono text-xs font-medium tracking-[0.08em] text-muted-foreground uppercase">
        {label}
      </p>
      <h2
        id={headingId}
        class="mt-3 text-[clamp(1.875rem,4vw,2.75rem)] font-semibold tracking-[-0.02em] text-balance"
      >
        {title}
      </h2>
      {#if lead}
        <p class="mt-4 max-w-[60ch] text-base leading-relaxed text-muted-foreground md:text-lg">
          {lead}
        </p>
      {/if}
    </header>
    {@render children()}
  </div>
</section>
