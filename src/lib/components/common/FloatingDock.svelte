<script lang="ts">
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import type { Attachment } from 'svelte/attachments';
  import { resolve } from '$app/paths';
  import { createScrollSpy } from '$lib/hooks/use-scrollspy.svelte';
  import { dockNavItems, sectionIds } from '$lib/data/nav';
  import { profile } from '$lib/data/profile';
  import { MOTION, prefersReducedMotion } from '$lib/utils/motion';
  import ThemeToggle from './ThemeToggle.svelte';
  import ShineButton from './ShineButton.svelte';
  import { browser } from '$app/environment';

  if (browser) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const spy = createScrollSpy(sectionIds);

  const magnify: Attachment<HTMLDivElement> = (pill) => {
    if (
      prefersReducedMotion() ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return;
    }
    const items = Array.from(pill.querySelectorAll<HTMLElement>('[data-dock-scale]'));
    if (items.length === 0) {
      return;
    }
    let pillLeft = 0;
    let centers: number[] = items.map(() => 0);
    const scales: number[] = items.map(() => 1);

    const measure = (): void => {
      const pillRect = pill.getBoundingClientRect();
      pillLeft = pillRect.left;
      centers = items.map((el) => {
        const rect = el.getBoundingClientRect();
        return rect.left - pillLeft + rect.width / 2;
      });
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(pill);
    window.addEventListener('resize', measure);

    let mouseX: number | null = null;
    let frame = 0;

    const tick = (): void => {
      frame = 0;
      let settled = true;
      for (let i = 0; i < items.length; i += 1) {
        let target = 1;
        if (mouseX !== null) {
          const distance = Math.abs(mouseX - centers[i]);
          if (distance <= 160) {
            target = 1 + 0.25 * Math.cos((distance / 160) * (Math.PI / 2));
          }
        }
        const next = scales[i] + (target - scales[i]) * 0.25;
        scales[i] = Math.abs(target - next) < 0.002 ? target : next;
        if (scales[i] !== target) {
          settled = false;
        }
        items[i].style.setProperty('--dock-scale', scales[i].toFixed(3));
      }
      if (!settled) {
        frame = requestAnimationFrame(tick);
      }
    };

    const requestTick = (): void => {
      if (frame === 0) {
        frame = requestAnimationFrame(tick);
      }
    };

    const onPointerMove = (event: PointerEvent): void => {
      mouseX = event.clientX - pillLeft;
      requestTick();
    };

    const onPointerLeave = (): void => {
      mouseX = null;
      requestTick();
    };

    pill.addEventListener('pointermove', onPointerMove, { passive: true });
    pill.addEventListener('pointerleave', onPointerLeave);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
      pill.removeEventListener('pointermove', onPointerMove);
      pill.removeEventListener('pointerleave', onPointerLeave);
      if (frame !== 0) {
        cancelAnimationFrame(frame);
      }
    };
  };

  const scrollspy: Attachment<HTMLElement> = () => {
    spy.start();
    return () => {
      spy.stop();
    };
  };

  const indicator: Attachment<HTMLDivElement> = (pill) => {
    const active = spy.activeId;
    const marker = pill.querySelector<HTMLElement>('[data-dock-indicator]');
    if (marker === null) {
      return;
    }

    const update = (): void => {
      const link =
        active === null ? null : pill.querySelector<HTMLElement>(`[data-dock-item="${active}"]`);
      if (link === null) {
        marker.style.opacity = '0';
        return;
      }
      marker.style.opacity = '1';
      marker.style.width = `${link.offsetWidth}px`;
      marker.style.transform = `translateX(${link.offsetLeft}px)`;
    };

    update();
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
    };
  };

  const scrollBehavior: Attachment<HTMLElement> = (nav) => {
    if (!window.matchMedia('(min-width: 768px)').matches) {
      return;
    }
    const duration = prefersReducedMotion() ? 0 : MOTION.durationSlow;
    let hidden = false;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const pastHero = self.scroll() > window.innerHeight * 0.75;
        const shouldHide = pastHero && self.direction === 1;
        if (shouldHide === hidden) {
          return;
        }
        hidden = shouldHide;
        gsap.to(nav, {
          yPercent: shouldHide ? -150 : 0,
          autoAlpha: shouldHide ? 0 : 1,
          scale: shouldHide ? 0.96 : 1,
          duration,
          ease: MOTION.easeSignature,
          overwrite: true
        });
      }
    });

    return () => {
      trigger.kill();
    };
  };
</script>

<nav
  aria-label="Primary"
  class="fixed inset-x-0 top-4 z-50 hidden justify-center px-4 md:flex"
  {@attach scrollspy}
  {@attach scrollBehavior}
>
  <div
    class="relative flex items-center gap-0.5 rounded-full glass-nav p-1.5"
    {@attach magnify}
    {@attach indicator}
  >
    <span
      data-dock-indicator
      aria-hidden="true"
      class="pointer-events-none absolute top-1.5 bottom-1.5 left-0 rounded-full bg-foreground/[0.08] opacity-0 duration-[var(--dur-base)] ease-[var(--ease-signature)] motion-safe:transition-[transform,width,opacity]"
    ></span>
    <a
      href={resolve('/#home')}
      aria-label={profile.name}
      class="flex h-8 items-center rounded-full px-3 text-sm font-semibold tracking-tight text-foreground transition-colors duration-[var(--dur-micro)] hover:bg-foreground/[0.06] focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:outline-none"
    >
      {profile.initials}
    </a>
    <span aria-hidden="true" class="mx-1 h-5 w-px shrink-0 bg-border"></span>
    {#each dockNavItems as item (item.href)}
      <a
        href={resolve(`/${item.href}`)}
        data-dock-item={item.href.slice(1)}
        data-dock-scale
        aria-current={spy.activeId === item.href.slice(1) ? 'true' : undefined}
        style="scale: var(--dock-scale, 1)"
        class="flex h-8 items-center rounded-full px-3 text-sm font-medium whitespace-nowrap transition-colors duration-[var(--dur-micro)] ease-[var(--ease-signature)] focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:outline-none"
        class:text-foreground={spy.activeId === item.href.slice(1)}
        class:text-muted-foreground={spy.activeId !== item.href.slice(1)}
        class:hover:text-foreground={spy.activeId !== item.href.slice(1)}
      >
        {item.label}
      </a>
    {/each}
    <span aria-hidden="true" class="mx-1 h-5 w-px shrink-0 bg-border"></span>
    <ThemeToggle />
    <ShineButton href="/#contact" size="sm" class="ml-1">Hire Me</ShineButton>
  </div>
</nav>
