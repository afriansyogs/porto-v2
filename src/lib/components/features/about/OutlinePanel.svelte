<script lang="ts">
  import { prefersReducedMotion } from '$lib/utils/motion';
  import { editor, editorFiles } from './editor-state.svelte';

  const headings = $derived(
    editorFiles[editor.activeFile].blocks.flatMap((block, index) =>
      block.type === 'heading' && block.level === 2 ? [{ text: block.text, index }] : []
    )
  );

  const activeName = $derived(editorFiles[editor.activeFile].name);

  const scrollToHeading = (index: number): void => {
    document.getElementById(`${editor.activeFile}-h-${index}`)?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'nearest'
    });
  };
</script>

<div class="border-t border-border px-3 pt-4 pb-3">
  <p
    class="px-2 py-1 font-mono text-[0.6875rem] font-medium tracking-[0.08em] text-muted-foreground uppercase"
  >
    Outline
  </p>
  <ul class="flex flex-col" aria-label={`Headings in ${activeName}`}>
    {#each headings as heading (heading.index)}
      <li>
        <button
          type="button"
          onclick={() => {
            scrollToHeading(heading.index);
          }}
          class="flex w-full items-center gap-2 rounded px-2 py-1 text-left text-xs text-muted-foreground transition-colors duration-[var(--dur-micro)] ease-[var(--ease-signature)] hover:bg-foreground/[0.04] hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:outline-none"
        >
          <span aria-hidden="true" class="font-mono opacity-50">#</span>
          <span class="truncate">{heading.text}</span>
        </button>
      </li>
    {/each}
  </ul>
</div>
