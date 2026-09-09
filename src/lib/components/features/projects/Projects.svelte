<script lang="ts">
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import type { Attachment } from 'svelte/attachments';
  import SectionShell from '$lib/components/common/SectionShell.svelte';
  import SocialIcon from '$lib/components/common/SocialIcon.svelte';
  import ProjectCard from './ProjectCard.svelte';
  import { projects } from '$lib/data/projects';
  import { profile } from '$lib/data/profile';
  import { MOTION, prefersReducedMotion } from '$lib/utils/motion';
  import { cn } from '$lib/utils';
  import { ghostButtonClasses } from '$lib/utils/button-styles';
  import DotPattern from '$lib/components/common/effects/DotPattern.svelte';
  import { browser } from '$app/environment';

  if (browser) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const github = profile.socials.find((social) => social.icon === 'github');

  const batchReveal: Attachment<HTMLElement> = (grid) => {
    if (prefersReducedMotion()) {
      return;
    }
    const cards = Array.from(grid.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement
    );
    const triggers = ScrollTrigger.batch(cards, {
      start: 'top 85%',
      once: true,
      onEnter: (batch) => {
        gsap.from(batch, {
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
      for (const trigger of triggers) {
        trigger.kill();
      }
      gsap.set(cards, { clearProps: 'all' });
    };
  };
</script>

<SectionShell
  id="projects"
  index="03"
  title="Featured Engineering"
  lead="A collection of secure applications built for the real world. From designing scalable databases to deploying resilient fullstack ecosystems."
>
  {#snippet background()}
    <DotPattern strong masked />
  {/snippet}

  <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6" {@attach batchReveal}>
    {#each projects as project (project.slug)}
      <ProjectCard item={project} />
    {/each}
  </div>

  <div class="mt-12 flex justify-center">
    {#if github !== undefined}
      <a
        href={github.href}
        target="_blank"
        rel="noopener noreferrer external"
        class={cn(ghostButtonClasses, 'h-10 px-5 text-sm')}
      >
        <SocialIcon icon="github" class="size-3.5" />
        View more on GitHub
      </a>
    {/if}
  </div>
</SectionShell>
