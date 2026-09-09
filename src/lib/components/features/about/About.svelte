<script lang="ts">
  import SectionShell from '$lib/components/common/SectionShell.svelte';
  import CvButton from '$lib/components/common/CvButton.svelte';
  import DotPattern from '$lib/components/common/effects/DotPattern.svelte';
  import RadialGlow from '$lib/components/common/effects/RadialGlow.svelte';
  import EditorWindow from './EditorWindow.svelte';
</script>

<SectionShell
  id="about"
  index="01"
  title="Who Is Afrians"
  lead="I engineer scalable web applications. Since I live inside a code editor"
>
  {#snippet background()}
    <DotPattern masked />
    <RadialGlow followCursor />
  {/snippet}

  <EditorWindow />
  <div class="mt-12 flex justify-center">
    <CvButton />
  </div>
</SectionShell>
