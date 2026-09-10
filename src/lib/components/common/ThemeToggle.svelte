<script lang="ts">
  import { mode, toggleMode } from 'mode-watcher';
  import Sun from '@lucide/svelte/icons/sun';
  import Moon from '@lucide/svelte/icons/moon';
  import { cn } from '$lib/utils';

  const isDark = $derived(mode.current !== 'light');

  const iconClass =
    'absolute size-4 transition-[scale,rotate,opacity] duration-[var(--dur-micro)] ease-[var(--ease-signature)]';
</script>

<button
  type="button"
  onclick={toggleMode}
  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
  class="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors duration-[var(--dur-micro)] ease-[var(--ease-signature)] hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:outline-none cursor-pointer"
>
  <span class="relative flex size-4 items-center justify-center">
    <Sun
      aria-hidden="true"
      strokeWidth={1.75}
      class={cn(
        iconClass,
        isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
      )}
    />
    <Moon
      aria-hidden="true"
      strokeWidth={1.75}
      class={cn(
        iconClass,
        isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
      )}
    />
  </span>
</button>
