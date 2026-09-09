<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Attachment } from 'svelte/attachments';
  import { cn } from '$lib/utils';

  interface Props {
    direction?: 'left' | 'right';
    duration?: number;
    class?: string;
    children: Snippet;
  }

  let { direction = 'left', duration = 45, class: className, children }: Props = $props();

  let isInView = $state(true);

  const observeVisibility: Attachment<HTMLDivElement> = (node) => {
    const observer = new IntersectionObserver(
      (entries) => {
        isInView = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: '100px 0px' }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  };
</script>

<div
  class={cn('marquee relative overflow-hidden', className)}
  style="--marquee-duration: {duration}s"
  {@attach observeVisibility}
>
  <div
    class="marquee-track flex w-max"
    class:marquee-right={direction === 'right'}
    style:animation-play-state={isInView ? undefined : 'paused'}
  >
    <div class="marquee-copy flex shrink-0 items-stretch gap-3 pr-3">
      {@render children()}
    </div>
    <div class="marquee-copy flex shrink-0 items-stretch gap-3 pr-3" aria-hidden="true">
      {@render children()}
    </div>
  </div>
</div>

<style>
  .marquee {
    mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  }

  .marquee-track {
    animation: marquee-left var(--marquee-duration, 45s) linear infinite;
    will-change: transform;
  }

  .marquee-right {
    animation-name: marquee-right;
  }

  @keyframes marquee-left {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  @keyframes marquee-right {
    from {
      transform: translateX(-50%);
    }
    to {
      transform: translateX(0);
    }
  }

  .marquee:hover .marquee-track,
  .marquee:focus-within .marquee-track {
    animation-play-state: paused !important;
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee {
      overflow-x: clip;
      overflow-y: visible;
      mask-image: none;
      -webkit-mask-image: none;
    }
    .marquee-track {
      width: 100% !important;
      flex-wrap: wrap;
      justify-content: center;
      animation: none;
      will-change: auto;
    }

    .marquee-copy {
      padding-right: 0;
      flex-wrap: wrap;
      justify-content: center;
    }
    .marquee-copy:last-child {
      display: none;
    }
  }
</style>
