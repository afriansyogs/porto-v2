<script lang="ts">
  import ChevronRight from '@lucide/svelte/icons/chevron-right';
  import Folder from '@lucide/svelte/icons/folder';
  import FolderOpen from '@lucide/svelte/icons/folder-open';
  import FileText from '@lucide/svelte/icons/file-text';
  import { cn } from '$lib/utils';
  import { editor, editorFileOrder, editorFiles } from './editor-state.svelte';

  let expanded = $state(true);
</script>

<div class="flex flex-col gap-0.5 p-3">
  <p
    class="px-2 py-1 font-mono text-[0.6875rem] font-medium tracking-[0.08em] text-muted-foreground uppercase"
  >
    Explorer
  </p>

  <button
    type="button"
    onclick={() => {
      expanded = !expanded;
    }}
    aria-expanded={expanded}
    aria-controls="editor-file-list"
    class="flex w-full items-center gap-1.5 rounded px-2 py-1 text-left text-xs font-semibold text-foreground transition-colors duration-[var(--dur-micro)] hover:bg-foreground/[0.06] focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:outline-none"
  >
    <ChevronRight
      aria-hidden="true"
      strokeWidth={1.75}
      class={cn(
        'size-3.5 shrink-0 text-muted-foreground transition-transform duration-[var(--dur-base)] ease-[var(--ease-signature)]',
        expanded && 'rotate-90'
      )}
    />
    {#if expanded}
      <FolderOpen aria-hidden="true" strokeWidth={1.75} class="size-3.5 shrink-0" />
    {:else}
      <Folder aria-hidden="true" strokeWidth={1.75} class="size-3.5 shrink-0" />
    {/if}
    <span class="tracking-wide uppercase">Portfolio</span>
  </button>

  {#if expanded}
    <ul id="editor-file-list" class="flex flex-col" aria-label="Portfolio files">
      {#each editorFileOrder as id (id)}
        {@const file = editorFiles[id]}
        {@const isActive = editor.activeFile === id}
        <li>
          <button
            type="button"
            onclick={() => {
              editor.open(id);
            }}
            aria-current={isActive ? 'true' : undefined}
            class={cn(
              'relative flex w-full items-center gap-2 py-1.5 pr-2 pl-7 text-left transition-colors duration-[var(--dur-micro)] ease-[var(--ease-signature)] focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:outline-none focus-visible:ring-inset',
              isActive
                ? 'bg-foreground/[0.08] text-foreground'
                : 'text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground'
            )}
          >
            {#if isActive}
              <span aria-hidden="true" class="absolute inset-y-0 left-0 w-0.5 bg-foreground"></span>
            {/if}
            <FileText aria-hidden="true" strokeWidth={1.75} class="size-3.5 shrink-0" />
            <span class="font-mono text-xs">{file.name}</span>
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
