import { SvelteMap } from 'svelte/reactivity';

export function createScrollSpy<T extends string>(
  ids: readonly T[],
  rootMargin = '-30% 0px -55% 0px'
) {
  let activeId = $state<T | null>(null);
  const ratios = new SvelteMap<string, number>();
  let observer: IntersectionObserver | null = null;

  function start(): void {
    if (typeof document === 'undefined' || observer !== null) {
      return;
    }
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best: T | null = null;
        let bestRatio = 0;
        for (const id of ids) {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (best !== null) {
          activeId = best;
        }
      },
      { rootMargin, threshold: [0, 0.2, 0.5] }
    );
    for (const id of ids) {
      const element = document.getElementById(id);
      if (element !== null) {
        observer.observe(element);
      }
    }
  }

  function stop(): void {
    observer?.disconnect();
    observer = null;
    ratios.clear();
  }

  return {
    get activeId(): T | null {
      return activeId;
    },
    start,
    stop
  };
}
