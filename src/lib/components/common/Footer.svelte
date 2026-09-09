<script lang="ts">
  import type { Attachment } from 'svelte/attachments';
  import { resolve } from '$app/paths';
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import { profile } from '$lib/data/profile';
  import { footerNavItems } from '$lib/data/nav';
  import { prefersReducedMotion } from '$lib/utils/motion';
  import GridBackground from './effects/GridBackground.svelte';
  import SocialLinks from './SocialLinks.svelte';
  import CvButton from './CvButton.svelte';

  let year = $state('');
  const setYear: Attachment<HTMLElement> = () => {
    year = String(new Date().getFullYear());
  };

  const backToTop = (): void => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };
</script>

<footer class="relative overflow-hidden border-t border-border">
  <GridBackground masked />

  <div class="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-8">
    <div class="grid gap-12 py-16 md:grid-cols-[1fr_auto] md:gap-20">
      <div>
        <div class="flex items-center gap-3">
          <span
            class="flex size-10 shrink-0 items-center justify-center rounded-lg glass-soft font-mono text-sm font-bold"
          >
            {profile.initials}
          </span>
          <div>
            <p class="text-base font-bold tracking-tight">{profile.name}</p>
            <p class="font-mono text-xs text-muted-foreground">
              {profile.role} · {profile.focus}
            </p>
          </div>
        </div>
        <SocialLinks class="mt-6" />
      </div>

      <nav aria-label="Footer">
        <p
          class="font-mono text-[0.6875rem] font-medium tracking-[0.08em] text-muted-foreground uppercase"
        >
          Navigate
        </p>
        <ul class="mt-4 grid grid-cols-2 gap-x-12 gap-y-2.5">
          {#each footerNavItems as item (item.href)}
            <li>
              <a
                href={resolve(`/${item.href}`)}
                class="text-sm text-muted-foreground transition-colors duration-[var(--dur-micro)] ease-[var(--ease-signature)] hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:outline-none"
              >
                {item.label}
              </a>
            </li>
          {/each}
        </ul>
        <CvButton class="mt-8" />
      </nav>
    </div>

    <div
      class="flex flex-col items-center justify-between gap-4 border-t border-border pt-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:flex-row md:pb-6"
    >
      <p class="text-center font-mono text-xs text-muted-foreground md:text-left">
        © <span {@attach setYear}>{year}</span>
        {profile.name} · Built with SvelteKit &amp; Tailwind CSS
      </p>
      <button
        type="button"
        onclick={backToTop}
        aria-label="Back to top"
        class="flex size-9 shrink-0 items-center justify-center rounded-full glass-soft text-muted-foreground transition-colors duration-[var(--dur-micro)] ease-[var(--ease-signature)] hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:outline-none"
      >
        <ArrowUp aria-hidden="true" strokeWidth={1.75} class="size-4" />
      </button>
    </div>
  </div>
</footer>
