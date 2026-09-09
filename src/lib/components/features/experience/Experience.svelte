<script lang="ts">
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import type { Attachment } from 'svelte/attachments';
  import SectionShell from '$lib/components/common/SectionShell.svelte';
  import TimelineItem from './TimelineItem.svelte';
  import { experience } from '$lib/data/experience';
  import { MOTION, prefersReducedMotion } from '$lib/utils/motion';
  import { browser } from '$app/environment';

  if (browser) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const timelineMotion: Attachment<HTMLElement> = (container) => {
    const progress = container.querySelector<HTMLElement>('[data-progress]');
    const fills = gsap.utils.toArray<HTMLElement>('[data-node-fill]', container);
    const cards = gsap.utils.toArray<HTMLElement>('[data-card]', container);

    if (prefersReducedMotion()) {
      if (progress !== null) {
        gsap.set(progress, { scaleY: 1 });
      }
      gsap.set(fills, { scale: 1 });
      return;
    }

    let scrub: gsap.core.Tween | null = null;
    if (progress !== null) {
      scrub = gsap.to(progress, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 60%',
          end: 'bottom 75%',
          scrub: true
        }
      });
    }

    const dotTriggers: ScrollTrigger[] = [];
    for (const fill of fills) {
      const entry = fill.closest('li');
      if (entry === null) {
        continue;
      }
      dotTriggers.push(
        ScrollTrigger.create({
          trigger: entry,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(fill, {
              keyframes: [
                { scale: 1.3, duration: MOTION.durationBase, ease: MOTION.easeSignature },
                { scale: 1, duration: MOTION.durationMicro, ease: MOTION.easeSignature }
              ]
            });
          }
        })
      );
    }

    const batch = ScrollTrigger.batch(cards, {
      start: 'top 85%',
      once: true,
      onEnter: (entered) => {
        gsap.from(entered, {
          y: 24,
          opacity: 0,
          duration: MOTION.durationSlow,
          ease: MOTION.easeSignature,
          stagger: MOTION.staggerDefault,
          overwrite: true
        });
      }
    });

    return () => {
      scrub?.scrollTrigger?.kill();
      scrub?.kill();
      for (const trigger of dotTriggers) {
        trigger.kill();
      }
      for (const trigger of batch) {
        trigger.kill();
      }
      gsap.set([...fills, ...cards, ...(progress !== null ? [progress] : [])], {
        clearProps: 'all'
      });
    };
  };
</script>

<SectionShell
  id="experience"
  index="04"
  title="Work Experience"
  lead="Real-world roles and responsibilities. Focused on building scalable web applications, securing logic, and delivering reliable code to production."
>
  <div class="relative" {@attach timelineMotion}>
    <div
      aria-hidden="true"
      class="absolute top-0 bottom-0 left-1.5 w-0.5 rounded-full bg-border md:left-1/2 md:-translate-x-1/2"
    ></div>
    <div
      aria-hidden="true"
      data-progress
      class="absolute top-0 bottom-0 left-1.5 w-0.5 origin-top rounded-full bg-foreground md:left-1/2 md:-translate-x-1/2"
      style="transform: scaleY(0)"
    ></div>

    <ol class="relative flex flex-col gap-10 md:gap-12">
      {#each experience as item, index (item.company + item.start)}
        <TimelineItem {item} side={index % 2 === 0 ? 'left' : 'right'} />
      {/each}
    </ol>
  </div>
</SectionShell>
