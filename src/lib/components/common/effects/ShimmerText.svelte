<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    text: string;
    class?: string;
  }

  let { text, class: className, ...rest }: Props = $props();
</script>

<span {...rest} class={cn('shimmer-text', className)}>{text}</span>

<style>
  .shimmer-text {
    background-image: linear-gradient(
      100deg,
      var(--muted-foreground) 35%,
      var(--foreground) 50%,
      var(--muted-foreground) 65%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: shimmer 4s linear infinite;
  }

  @keyframes shimmer {
    to {
      background-position: -200% center;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .shimmer-text {
      animation: none;
      background-image: none;
      color: var(--muted-foreground);
    }
  }
</style>
