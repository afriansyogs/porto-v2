<script lang="ts">
  import FileText from '@lucide/svelte/icons/file-text';
  import X from '@lucide/svelte/icons/x';
  import { cn } from '$lib/utils';
  import { editor, editorFiles } from './editor-state.svelte';

  const tabId = (id: string): string => `editor-tab-${id}`;

  const onTabKeydown = (event: KeyboardEvent, index: number): void => {
    const tabs = editor.tabs;
    let next = -1;
    if (event.key === 'ArrowRight') {
      next = (index + 1) % tabs.length;
    } else if (event.key === 'ArrowLeft') {
      next = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = tabs.length - 1;
    }
    if (next === -1) {
      return;
    }
    event.preventDefault();
    const target = tabs[next];
    if (target === undefined) {
      return;
    }
    editor.open(target);
    document.getElementById(tabId(target))?.focus();
  };
</script>

<div
  class="flex h-9 [scrollbar-width:none] items-stretch overflow-x-auto border-b border-border [&::-webkit-scrollbar]:hidden"
  role="tablist"
  aria-label="Open files"
>
  {#each editor.tabs as id, index (id)}
    {@const file = editorFiles[id]}
    {@const isActive = editor.activeFile === id}
    <div
      class={cn(
        'relative flex shrink-0 items-stretch border-r border-border transition-colors duration-[var(--dur-micro)] ease-[var(--ease-signature)]',
        isActive
          ? 'bg-foreground/[0.06] text-foreground'
          : 'text-muted-foreground hover:bg-foreground/[0.03] hover:text-foreground'
      )}
    >
      {#if isActive}
        <span aria-hidden="true" class="absolute inset-x-0 top-0 h-px bg-foreground/40"></span>
      {/if}
      <button
        type="button"
        role="tab"
        id={tabId(id)}
        aria-selected={isActive}
        aria-controls="editor-panel"
        tabindex={isActive ? 0 : -1}
        onclick={() => {
          editor.open(id);
        }}
        onkeydown={(event) => {
          onTabKeydown(event, index);
        }}
        class="flex items-center gap-1.5 px-3 font-mono text-xs focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:outline-none focus-visible:ring-inset"
      >
        <FileText aria-hidden="true" strokeWidth={1.75} class="size-3.5 shrink-0" />
        {file.name}
      </button>
      {#if editor.tabs.length > 1}
        <button
          type="button"
          onclick={(event) => {
            event.stopPropagation();
            editor.closeTab(id);
          }}
          aria-label={`Close ${file.name}`}
          class="hidden items-center px-2 transition-colors duration-[var(--dur-micro)] hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:outline-none focus-visible:ring-inset md:flex"
        >
          <X aria-hidden="true" strokeWidth={2} class="size-3" />
        </button>
      {/if}
    </div>
  {/each}
</div>
