<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import { ModeWatcher } from 'mode-watcher';
  import NoiseOverlay from '$lib/components/common/effects/NoiseOverlay.svelte';
  import AmbientBackdrop from '$lib/components/common/effects/AmbientBackdrop.svelte';
  import FloatingDock from '$lib/components/common/FloatingDock.svelte';
  import MobileDock from '$lib/components/common/MobileDock.svelte';
  import Footer from '$lib/components/common/Footer.svelte';
  import SEOHead from '$lib/components/common/SEOHead.svelte';

  let { children } = $props();
</script>

<SEOHead />
<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher defaultMode="dark" />
<AmbientBackdrop />
<NoiseOverlay />
<FloatingDock />
<MobileDock />
{@render children()}
<Footer />
