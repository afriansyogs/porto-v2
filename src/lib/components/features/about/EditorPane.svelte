<script lang="ts">
  import CountUp from '$lib/components/common/effects/CountUp.svelte';
  import type { Attachment } from 'svelte/attachments';
  import type { DocBlock } from '$lib/types';
  import { prefersReducedMotion } from '$lib/utils/motion';
  import DitherPortrait from '$lib/components/common/effects/DitherPortrait.svelte';
  import { cn } from '$lib/utils';
  import { editor, editorFiles } from './editor-state.svelte';

  const GUTTER_LINE = 24;
  const EXTRA_LINES = 5;

  const active = $derived(editorFiles[editor.activeFile]);
  const panelLabelId = $derived(`editor-tab-${editor.activeFile}`);

  function estimateLines(block: DocBlock): number {
    switch (block.type) {
      case 'heading':
        return 2;
      case 'paragraph':
        return Math.ceil(block.text.length / 50) + 1;
      case 'list':
        return block.items.length + 1;
      case 'code':
        return block.content.split('\n').length + 1;
      case 'stats':
        return 6;
      case 'portrait':
        return 12;
    }
  }

  let panelElement = $state<HTMLElement | null>(null);
  const measuredHeights = $state<Record<string, number>>({});

  const measureContent: Attachment<HTMLElement> = (element) => {
    const fileId = editor.activeFile;
    const update = (): void => {
      measuredHeights[fileId] = Math.ceil(element.getBoundingClientRect().height);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  };

  $effect(() => {
    if (editor.activeFile && panelElement) {
      panelElement.scrollTop = 0;
    }
  });

  const currentMeasuredHeight = $derived(measuredHeights[editor.activeFile] ?? 0);

  const estimatedLines = $derived.by(() => {
    return active.blocks.reduce((total, block) => total + estimateLines(block), 0);
  });

  const contentLines = $derived.by(() => {
    if (currentMeasuredHeight > 0) {
      return Math.ceil(currentMeasuredHeight / GUTTER_LINE);
    }
    return estimatedLines;
  });

  const lineCount = $derived(contentLines + EXTRA_LINES);

  const spacerHeight = $derived.by(() => {
    if (currentMeasuredHeight > 0) {
      return Math.max(EXTRA_LINES * GUTTER_LINE, lineCount * GUTTER_LINE - currentMeasuredHeight);
    }
    return EXTRA_LINES * GUTTER_LINE;
  });

  const gutterLines = $derived(Array.from({ length: lineCount }, (_, index) => index + 1));

  let statsVisible = $state(false);
  let useSpring = $state(false);

  const statsReveal: Attachment<HTMLElement> = (element) => {
    useSpring = !prefersReducedMotion();
    if (!useSpring) {
      statsVisible = true;
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting === true) {
          statsVisible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  };

  const onPaneScroll = (scrollTop: number): void => {
    editor.cursorLine = Math.min(lineCount, Math.floor(scrollTop / GUTTER_LINE) + 1);
  };
</script>

<div
  id="editor-panel"
  bind:this={panelElement}
  role="tabpanel"
  aria-labelledby={panelLabelId}
  tabindex="0"
  class={cn(
    'flex min-h-0 flex-1 items-start focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:outline-none focus-visible:ring-inset',
    editor.activeFile === 'education'
      ? 'overflow-y-hidden'
      : 'max-h-[30rem] overflow-y-auto md:max-h-[34rem]'
  )}
  onscroll={(event) => {
    onPaneScroll(event.currentTarget.scrollTop);
  }}
>
  <div
    aria-hidden="true"
    class="w-11 shrink-0 pt-6 pr-3 pb-6 text-right font-mono text-xs leading-6 text-muted-foreground select-none"
  >
    {#each gutterLines as line (line)}
      <div>{line}</div>
    {/each}
  </div>

  <div class="min-w-0 flex-1 pt-6 pr-4 pb-6 pl-2 md:pr-5">
    {#key editor.activeFile}
      <div class="pane-swap">
        <div {@attach measureContent}>
          {#each active.blocks as block, index (index)}
            {@render renderBlock(block, index)}
          {/each}
        </div>
        <div style="height: {spacerHeight}px;" aria-hidden="true"></div>
      </div>
    {/key}
  </div>
</div>

<p class="sr-only" aria-live="polite">Now viewing {active.name} — {active.title}</p>

{#snippet renderBlock(block: DocBlock, index: number)}
  {#if block.type === 'heading'}
    {#if block.level === 2}
      <h3
        id={`${editor.activeFile}-h-${index}`}
        class="mt-8 text-lg font-bold tracking-[-0.02em] first:mt-0"
      >
        {block.text}
      </h3>
    {:else}
      <h4 class="mt-6 text-sm font-semibold">{block.text}</h4>
    {/if}
  {:else if block.type === 'paragraph'}
    <p class="mt-3 text-[0.8125rem] leading-[1.7] text-muted-foreground">{block.text}</p>
  {:else if block.type === 'list'}
    <ul class="mt-3 flex flex-col gap-1.5">
      {#each block.items as item (item)}
        <li class="flex items-start gap-2.5 text-[0.8125rem] leading-[1.6] text-muted-foreground">
          <span
            aria-hidden="true"
            class="mt-[0.5em] size-1 shrink-0 rounded-full bg-current opacity-60"
          ></span>
          <span>{item}</span>
        </li>
      {/each}
    </ul>
  {:else if block.type === 'code'}
    <pre
      class="mt-3 overflow-x-auto rounded-md bg-foreground/[0.05] p-3.5 font-mono text-xs leading-[1.65] text-muted-foreground"><code
        >{block.content}</code
      ></pre>
  {:else if block.type === 'stats'}
    <div class="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4" {@attach statsReveal}>
      {#each block.items as stat (stat.label)}
        <div class="rounded-md bg-foreground/[0.05] px-3 py-2.5 text-left">
          <p class="font-mono text-lg font-bold tabular-nums">
            {#if useSpring && statsVisible}
              <CountUp value={stat.value} class="tabular-nums" />
            {:else if useSpring}
              0
            {:else}
              {stat.value.toLocaleString()}
            {/if}{#if stat.suffix}<span class="text-muted-foreground">{stat.suffix}</span>{/if}
          </p>
          <p
            class="mt-0.5 font-mono text-[0.625rem] tracking-[0.08em] text-muted-foreground uppercase"
          >
            {stat.label}
          </p>
        </div>
      {/each}
    </div>
  {:else}
    <div class="mt-4 max-w-56">
      <DitherPortrait />
    </div>
  {/if}
{/snippet}

<style>
  .pane-swap {
    animation: pane-swap var(--dur-base) var(--ease-signature);
  }

  @keyframes pane-swap {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pane-swap {
      animation: none;
    }
  }
</style>
