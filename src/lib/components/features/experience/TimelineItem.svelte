<script lang="ts">
  import type { ExperienceItem } from '$lib/types';
  import { cn } from '$lib/utils';

  interface Props {
    item: ExperienceItem;
    side: 'left' | 'right';
  }

  let { item, side }: Props = $props();

  const period = $derived(`${item.start} — ${item.end ?? 'Present'}`);
</script>

<li class="relative md:grid md:grid-cols-2 md:gap-x-14">
  <div class="absolute top-2 left-0 z-10 md:left-1/2 md:-translate-x-1/2">
    <span
      class="relative flex size-3 items-center justify-center rounded-full border border-border bg-background"
    >
      <span
        data-node-fill
        aria-hidden="true"
        class="absolute inset-[2px] rounded-full bg-foreground"
        style="transform: scale(0)"
      ></span>
    </span>
  </div>

  <article
    data-card
    class={cn(
      'ml-10 rounded-[10px] glass p-5 md:ml-0 md:p-6',
      side === 'left' ? 'md:col-start-1' : 'md:col-start-2'
    )}
  >
    <p
      class="flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.08em] text-muted-foreground uppercase"
    >
      {period}
      {#if item.current === true}
        <span class="relative flex size-1.5" aria-hidden="true">
          <span class="pulse-ring absolute inline-flex size-full rounded-full bg-foreground"></span>
          <span class="relative inline-flex size-1.5 rounded-full bg-foreground"></span>
        </span>
        <span class="sr-only">Current role</span>
      {/if}
    </p>

    <h3 class="mt-2 text-lg font-semibold tracking-[-0.01em] md:text-xl">{item.role}</h3>
    <p class="mt-1 text-sm text-muted-foreground">
      {item.company} · {item.location}
    </p>

    <ul class="mt-4 flex flex-col gap-2">
      {#each item.achievements as achievement (achievement)}
        <li class="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
          <span
            aria-hidden="true"
            class="mt-[0.55em] size-1 shrink-0 rounded-full bg-current opacity-60"
          ></span>
          <span>{achievement}</span>
        </li>
      {/each}
    </ul>

    <ul class="mt-5 flex flex-wrap gap-1.5" aria-label={`Tech stack at ${item.company}`}>
      {#each item.tags as tag (tag)}
        <li
          class="rounded bg-foreground/[0.05] px-2 py-0.5 font-mono text-[0.6875rem] text-muted-foreground"
        >
          {tag}
        </li>
      {/each}
    </ul>
  </article>
</li>
