<script lang="ts">
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import type { Attachment } from 'svelte/attachments';
  import { resolve } from '$app/paths';
  import House from '@lucide/svelte/icons/house';
  import UserRound from '@lucide/svelte/icons/user-round';
  import Blocks from '@lucide/svelte/icons/blocks';
  import Layers from '@lucide/svelte/icons/layers';
  import Briefcase from '@lucide/svelte/icons/briefcase';
  import CircleHelp from '@lucide/svelte/icons/circle-help';
  import Mail from '@lucide/svelte/icons/mail';
  import { createScrollSpy } from '$lib/hooks/use-scrollspy.svelte';
  import { dockNavItems, sectionIds } from '$lib/data/nav';
  import { MOTION, prefersReducedMotion } from '$lib/utils/motion';
  import { cn } from '$lib/utils';
  import ThemeToggle from './ThemeToggle.svelte';
  import ShineButton from './ShineButton.svelte';
  import { browser } from '$app/environment';

  if (browser) {
    gsap.registerPlugin(ScrollTrigger);
  }

  type SectionId = (typeof sectionIds)[number];
  type Icon = typeof House;

  const spy = createScrollSpy(sectionIds);
  let expanded = $state(false);

  const sectionIcons: Record<SectionId, Icon> = {
    home: House,
    about: UserRound,
    skills: Blocks,
    projects: Layers,
    experience: Briefcase,
    faq: CircleHelp,
    contact: Mail
  };
  const dockIcons = [
    House,
    UserRound,
    Blocks,
    Layers,
    Briefcase
  ] as const satisfies readonly Icon[];

  const ActiveIcon = $derived(sectionIcons[spy.activeId ?? 'home']);

  const cellBase =
    'grid motion-safe:transition-[grid-template-columns,opacity,visibility] duration-[var(--dur-slow)] ease-[var(--ease-signature)]';

  const dismiss: Attachment<HTMLDivElement> = (pill) => {
    const onPointerDown = (event: PointerEvent): void => {
      if (expanded && !pill.contains(event.target as Node)) {
        expanded = false;
      }
    };
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        expanded = false;
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    pill.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      pill.removeEventListener('keydown', onKeyDown);
    };
  };

  const scrollspy: Attachment<HTMLElement> = () => {
    spy.start();
    return () => {
      spy.stop();
    };
  };

  const scrollBehavior: Attachment<HTMLElement> = (nav) => {
    if (window.matchMedia('(min-width: 768px)').matches) {
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
          yPercent: shouldHide ? 150 : 0,
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
  class="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden"
  {@attach scrollspy}
  {@attach scrollBehavior}
>
  <div class="relative flex items-center rounded-full glass-nav p-1.5" {@attach dismiss}>
    <div
      class={cn(
        cellBase,
        expanded ? 'invisible grid-cols-[0fr] opacity-0' : 'visible grid-cols-[1fr] opacity-100'
      )}
    >
      <div class="overflow-hidden">
        <button
          type="button"
          onclick={() => {
            expanded = true;
          }}
          aria-label="Open navigation"
          aria-expanded={expanded}
          class="flex size-8 items-center justify-center rounded-full text-foreground transition-colors duration-[var(--dur-micro)] hover:bg-foreground/[0.06] focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:outline-none"
        >
          <ActiveIcon aria-hidden="true" strokeWidth={1.75} class="size-4" />
        </button>
      </div>
    </div>
    <div
      class={cn(
        cellBase,
        expanded ? 'visible grid-cols-[1fr] opacity-100' : 'invisible grid-cols-[0fr] opacity-0'
      )}
    >
      <div class="overflow-hidden">
        <div class="flex items-center gap-0.5">
          {#each dockNavItems as item, i (item.href)}
            {@const Icon = dockIcons[i]}
            <a
              href={resolve(`/${item.href}`)}
              onclick={() => {
                expanded = false;
              }}
              aria-label={item.label}
              aria-current={spy.activeId === item.href.slice(1) ? 'page' : undefined}
              class={cn(
                'flex size-8 items-center justify-center rounded-full transition-colors duration-[var(--dur-micro)] ease-[var(--ease-signature)] focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:outline-none',
                spy.activeId === item.href.slice(1)
                  ? 'bg-foreground/[0.08] text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              <Icon aria-hidden="true" strokeWidth={1.75} class="size-4" />
            </a>
          {/each}
          <span aria-hidden="true" class="mx-1 h-5 w-px shrink-0 bg-border"></span>
          <ThemeToggle />
          <ShineButton
            href="/#contact"
            size="sm"
            class="ml-1"
            onclick={() => {
              expanded = false;
            }}
          >
            Hire Me
          </ShineButton>
        </div>
      </div>
    </div>
  </div>
</nav>
