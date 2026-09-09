<script lang="ts">
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import type { Attachment } from 'svelte/attachments';
  import { MOTION, prefersReducedMotion } from '$lib/utils/motion';
  import TitleBar from './TitleBar.svelte';
  import FileTree from './FileTree.svelte';
  import OutlinePanel from './OutlinePanel.svelte';
  import EditorTabs from './EditorTabs.svelte';
  import EditorPane from './EditorPane.svelte';
  import StatusBar from './StatusBar.svelte';

  gsap.registerPlugin(ScrollTrigger);

  const MAX_TILT = 1.5;

  const tilt: Attachment<HTMLElement> = (element) => {
    if (
      prefersReducedMotion() ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return;
    }
    const glare = element.querySelector<HTMLElement>('[data-glare]');
    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const tick = (): void => {
      frame = 0;
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      const settled = Math.abs(targetX - currentX) < 0.01 && Math.abs(targetY - currentY) < 0.01;
      if (settled) {
        currentX = targetX;
        currentY = targetY;
      }
      element.style.transform =
        currentX === 0 && currentY === 0
          ? ''
          : `perspective(1200px) rotateX(${currentX.toFixed(3)}deg) rotateY(${currentY.toFixed(3)}deg)`;
      if (!settled) {
        frame = requestAnimationFrame(tick);
      }
    };

    const request = (): void => {
      if (frame === 0) {
        frame = requestAnimationFrame(tick);
      }
    };

    const onPointerMove = (event: PointerEvent): void => {
      const rect = element.getBoundingClientRect();
      targetX = -((event.clientY - rect.top) / rect.height - 0.5) * 2 * MAX_TILT;
      targetY = ((event.clientX - rect.left) / rect.width - 0.5) * 2 * MAX_TILT;
      element.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      element.style.setProperty('--my', `${event.clientY - rect.top}px`);
      request();
    };

    const onPointerEnter = (): void => {
      glare?.style.setProperty('opacity', '1');
    };

    const onPointerLeave = (): void => {
      targetX = 0;
      targetY = 0;
      glare?.style.setProperty('opacity', '0');
      request();
    };

    element.addEventListener('pointermove', onPointerMove, { passive: true });
    element.addEventListener('pointerenter', onPointerEnter);
    element.addEventListener('pointerleave', onPointerLeave);
    return () => {
      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerenter', onPointerEnter);
      element.removeEventListener('pointerleave', onPointerLeave);
      if (frame !== 0) {
        cancelAnimationFrame(frame);
      }
      element.style.transform = '';
    };
  };

  const entrance: Attachment<HTMLElement> = (element) => {
    if (prefersReducedMotion()) {
      return;
    }
    const steps = gsap.utils.toArray<HTMLElement>('[data-window-step]', element);
    const timeline = gsap
      .timeline({
        defaults: { ease: MOTION.easeSignature },
        scrollTrigger: { trigger: element, start: 'top 80%', once: true }
      })
      .from(element, { scale: 0.97, y: 24, opacity: 0, duration: MOTION.durationStage })
      .from(
        steps,
        { y: 12, opacity: 0, duration: MOTION.durationSlow, stagger: MOTION.staggerDefault },
        '-=0.5'
      );
    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
      gsap.set([element, ...steps], { clearProps: 'all' });
    };
  };
</script>

<div class="relative" {@attach tilt}>
  <div class="relative flex flex-col overflow-hidden rounded-[10px] glass" {@attach entrance}>
    <span data-glare aria-hidden="true" class="glare pointer-events-none absolute inset-0 z-30"
    ></span>

    <div data-window-step>
      <TitleBar />
    </div>

    <div class="flex min-h-0 flex-1">
      <aside data-window-step class="hidden w-56 shrink-0 flex-col border-r border-border md:flex">
        <FileTree />
        <OutlinePanel />
      </aside>
      <div data-window-step class="flex min-w-0 flex-1 flex-col">
        <EditorTabs />
        <EditorPane />
      </div>
    </div>

    <div data-window-step>
      <StatusBar />
    </div>
  </div>
</div>

<style>
  .glare {
    opacity: 0;
    transition: opacity var(--dur-base) var(--ease-signature);
  }

  :global(.dark) .glare {
    background: radial-gradient(
      560px circle at var(--mx, 50%) var(--my, 50%),
      oklch(1 0 0 / 7%),
      transparent 55%
    );
  }
</style>
