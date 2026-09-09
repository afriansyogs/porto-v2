<script lang="ts">
  import GitBranch from '@lucide/svelte/icons/git-branch';
  import CircleCheckBig from '@lucide/svelte/icons/circle-check-big';
  import { editor } from './editor-state.svelte';
</script>

<div
  class="flex h-7 items-center justify-between border-t border-border bg-foreground/[0.05] px-3 font-mono text-[0.6875rem] text-muted-foreground"
>
  <div class="flex items-center gap-3">
    <span class="flex items-center gap-1.5">
      <GitBranch aria-hidden="true" strokeWidth={1.75} class="size-3" />
      main
    </span>
    <span class="flex items-center gap-1.5">
      <CircleCheckBig aria-hidden="true" strokeWidth={1.75} class="size-3" />
      0 problems
    </span>
  </div>
  <div class="flex items-center gap-3 overflow-hidden">
    <span class="truncate">Ln {editor.cursorLine}, Col 1</span>
    <span class="hidden sm:inline">Markdown</span>
  </div>
</div>
