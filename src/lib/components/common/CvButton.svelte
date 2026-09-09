<script lang="ts">
  import Download from '@lucide/svelte/icons/download';
  import { asset } from '$app/paths';
  import { profile } from '$lib/data/profile';
  import { cn } from '$lib/utils';
  import { ghostButtonClasses } from '$lib/utils/button-styles';

  interface Props {
    class?: string;
  }

  let { class: className }: Props = $props();

  // Ghost anchor mirroring ShineButton lg (its href prop is route-typed;
  // static files belong to asset() — see ShineButton's type comment). The
  // eslint no-navigation-without-resolve rule tracks asset() like resolve().
  const cvHref = asset(profile.resumeUrl);
</script>

<a href={cvHref} download class={cn(ghostButtonClasses, 'h-12 px-7 text-base', className)}>
  <Download aria-hidden="true" strokeWidth={1.75} class="size-4" />
  Download CV
</a>
