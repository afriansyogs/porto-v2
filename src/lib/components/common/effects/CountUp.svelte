<script lang="ts">
  import { prefersReducedMotion } from '$lib/utils/motion';

  interface Props {
    value: number;
    duration?: number;
    precision?: number;
    format?: (value: number) => string;
    class?: string;
  }

  let {
    value,
    duration = 750,
    precision = 0,
    format = (num: number) => num.toLocaleString(),
    class: className = ''
  }: Props = $props();

  let current = $state(0);

  $effect(() => {
    if (prefersReducedMotion()) {
      current = value;
      return;
    }

    const startTime = performance.now();
    const startValue = 0;
    const diff = value - startValue;
    let frameId: number;

    const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

    const tick = (now: number): void => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);

      current = startValue + diff * eased;

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        current = value;
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  });

  const displayValue = $derived(format(parseFloat(current.toFixed(precision))));
</script>

<span class={className}>{displayValue}</span>
