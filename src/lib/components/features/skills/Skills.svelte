<script lang="ts">
  import { asset } from '$app/paths';
  import type { SkillItem } from '$lib/types';
  import SectionShell from '$lib/components/common/SectionShell.svelte';
  import Marquee from '$lib/components/common/effects/Marquee.svelte';
  import { skills, aiMlFocus } from '$lib/data/skills';

  const half = Math.ceil(skills.length / 2);
  const rowA = skills.slice(0, half);
  const rowB = skills.slice(half);
</script>

<SectionShell
  id="skills"
  index="02"
  title="Active toolchain"
  lead="The tools I use to build and ship products, from web applications end to end to exploring the AI and ML space"
>
  <Marquee direction="right" class="mt-8">
    {#each rowA as item (item.name)}
      {@render tile(item)}
    {/each}
  </Marquee>
  <Marquee direction="left" class="mt-3">
    {#each rowB as item (item.name)}
      {@render tile(item)}
    {/each}
  </Marquee>

  <div class="mt-10 flex flex-wrap items-center gap-2">
    <span class="mr-1 font-mono text-[0.6875rem] tracking-[0.08em] text-muted-foreground uppercase">
    </span>
    {#each aiMlFocus as chip (chip)}
      <span
        class="rounded-full bg-foreground/[0.05] px-3 py-1.5 font-mono text-xs text-muted-foreground"
      >
        {chip}
      </span>
    {/each}
  </div>
</SectionShell>

{#snippet tile(item: SkillItem)}
  <div
    class="group my-1 flex h-18 shrink-0 items-center gap-3 rounded-[10px] border border-border bg-card/85 px-4 transition-[transform,border-color] duration-[var(--dur-micro)] ease-[var(--ease-signature)] hover:-translate-y-0.5 hover:border-foreground/25"
  >
    <img
      src={asset(item.icon)}
      alt=""
      width="28"
      height="28"
      loading="lazy"
      decoding="async"
      class="size-7 shrink-0 transition-transform duration-[var(--dur-micro)] ease-[var(--ease-signature)] group-hover:scale-[1.08]"
    />
    <span class="font-mono text-xs whitespace-nowrap">{item.name}</span>
  </div>
{/snippet}
