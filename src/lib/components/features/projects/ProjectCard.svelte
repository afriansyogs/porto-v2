<script lang="ts">
  import ExternalLink from '@lucide/svelte/icons/external-link';
  import type { ProjectItem } from '$lib/types';
  import SpotlightCard from '$lib/components/common/effects/SpotlightCard.svelte';
  import DitherMedia from '$lib/components/common/effects/DitherMedia.svelte';
  import SocialIcon from '$lib/components/common/SocialIcon.svelte';

  interface Props {
    item: ProjectItem;
  }

  let { item }: Props = $props();

  const repo = $derived(item.links.find((link) => link.kind === 'repo'));
  const demo = $derived(item.links.find((link) => link.kind === 'demo'));

  const linkClasses =
    'flex items-center gap-1.5 font-mono text-muted-foreground transition-colors duration-[var(--dur-micro)] ease-[var(--ease-signature)] hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:outline-none rounded';
</script>

<SpotlightCard class={item.featured === true ? 'xl:col-span-2' : undefined}>
  <DitherMedia
    src={item.image}
    alt={item.title}
    label={`${item.slug}.png`}
    class="border-b border-border"
  />

  <div class="flex flex-1 flex-col p-5">
    <div class="flex items-baseline justify-between gap-3">
      <h3 class="text-lg font-semibold tracking-[-0.01em]">{item.title}</h3>
      <span class="font-mono text-[0.6875rem] text-muted-foreground tabular-nums">
        {item.year}
      </span>
    </div>

    <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
      {item.description}
    </p>

    <ul class="mt-4 flex flex-wrap gap-1.5" aria-label={`${item.title} tech stack`}>
      {#each item.tags as tag (tag)}
        <li
          class="rounded bg-foreground/[0.05] px-2 py-0.5 font-mono text-[0.6875rem] text-muted-foreground"
        >
          {tag}
        </li>
      {/each}
    </ul>

    <div class="mt-auto flex items-center gap-4 border-t border-border pt-4 text-xs">
      {#if repo !== undefined}
        <a href={repo.href} target="_blank" rel="noopener noreferrer external" class={linkClasses}>
          <SocialIcon icon="github" class="size-3.5" />
          GitHub
        </a>
      {/if}
      {#if demo !== undefined}
        <a href={demo.href} target="_blank" rel="noopener noreferrer external" class={linkClasses}>
          <ExternalLink aria-hidden="true" strokeWidth={1.75} class="size-3.5" />
          Live
        </a>
      {/if}
    </div>
  </div>
</SpotlightCard>
