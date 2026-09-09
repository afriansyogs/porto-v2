<script lang="ts">
  import gsap from 'gsap';
  import type { Attachment } from 'svelte/attachments';
  import { profile } from '$lib/data/profile';
  import { MOTION, prefersReducedMotion } from '$lib/utils/motion';
  import GridBackground from '$lib/components/common/effects/GridBackground.svelte';
  import RadialGlow from '$lib/components/common/effects/RadialGlow.svelte';
  import ShimmerText from '$lib/components/common/effects/ShimmerText.svelte';
  import SocialLinks from '$lib/components/common/SocialLinks.svelte';
  import ShineButton from '$lib/components/common/ShineButton.svelte';
  import CvButton from '$lib/components/common/CvButton.svelte';
  import CloudAvatar from '$lib/components/features/avatar/CloudAvatar.svelte';

  const choreography: Attachment<HTMLElement> = (section) => {
    const steps = gsap.utils.toArray<HTMLElement>('[data-hero-step]', section);
    if (steps.length === 0 || prefersReducedMotion()) {
      return;
    }
    const timeline = gsap
      .timeline({ defaults: { duration: MOTION.durationSlow, ease: MOTION.easeSignature } })
      .from(steps, { y: 16, opacity: 0, stagger: MOTION.staggerDefault, delay: 0.15 });
    return () => {
      timeline.kill();
      gsap.set(steps, { clearProps: 'all' });
    };
  };
</script>

<section
  id="home"
  aria-labelledby="hero-title"
  class="relative flex min-h-svh items-center justify-center overflow-hidden"
  {@attach choreography}
>
  <GridBackground strong masked />
  <RadialGlow followCursor />

  <div
    class="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 pt-24 pb-24 text-center md:pt-28"
  >
    <CloudAvatar data-hero-step class="mb-4 md:mb-6" />

    <h1
      id="hero-title"
      data-hero-step
      aria-label={`${profile.fullName} (${profile.name})`}
      class="text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.05] font-bold tracking-[-0.03em] text-balance"
    >
      {profile.name}
    </h1>

    <ShimmerText
      data-hero-step
      text={`${profile.role} · ${profile.focus}`}
      class="mt-4 text-lg font-medium md:text-2xl"
    />

    <p
      data-hero-step
      class="mt-5 max-w-xl text-base leading-[1.7] text-pretty text-muted-foreground md:text-lg"
    >
      {profile.heroBio}
    </p>

    <div data-hero-step class="mt-9 flex flex-wrap items-center justify-center gap-3">
      <ShineButton href="/#contact" size="lg">Get in Touch</ShineButton>
      <CvButton />
    </div>

    <SocialLinks data-hero-step class="mt-9" />
  </div>

  <div
    data-hero-step
    aria-hidden="true"
    class="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
  >
    <div class="cue-mouse flex h-9 w-5.5 justify-center rounded-full border border-border pt-1.5">
      <span class="cue-dot size-1 rounded-full bg-muted-foreground"></span>
    </div>
  </div>
</section>

<style>
  .cue-dot {
    animation: cue-drop 1.8s var(--ease-signature) infinite;
  }

  @keyframes cue-drop {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    70%,
    100% {
      transform: translateY(12px);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .cue-dot {
      animation: none;
      opacity: 0.6;
    }
  }
</style>
