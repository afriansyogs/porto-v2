<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { profile } from '$lib/data/profile';
  import { cn } from '$lib/utils';
  import SocialIcon from './SocialIcon.svelte';

  // the eslint no-navigation-without-resolve rule's exemption for outbound
  interface Props extends HTMLAttributes<HTMLDivElement> {
    class?: string;
  }

  let { class: className, ...rest }: Props = $props();

  const isExternal = (href: string): boolean => href.startsWith('http');
</script>

<div {...rest} class={cn('flex items-center gap-1', className)}>
  {#each profile.socials as social (social.href)}
    <a
      href={social.href}
      aria-label={social.label}
      target={isExternal(social.href) ? '_blank' : undefined}
      rel="noopener noreferrer external"
      class="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-[var(--dur-micro)] ease-[var(--ease-signature)] hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:outline-none"
    >
      <SocialIcon icon={social.icon} />
    </a>
  {/each}
</div>
