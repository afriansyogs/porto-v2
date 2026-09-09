<script lang="ts">
  import { cn } from '$lib/utils';

  interface Props {
    strong?: boolean;
    masked?: boolean;
    class?: string;
  }

  let { strong = false, masked = false, class: className }: Props = $props();
</script>

<div
  aria-hidden="true"
  class={cn(
    'pointer-events-none absolute inset-0',
    strong ? 'bg-grid-strong' : 'bg-grid',
    masked && 'grid-mask-radial',
    className
  )}
></div>
