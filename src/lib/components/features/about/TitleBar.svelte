<script lang="ts">
  import Ellipsis from '@lucide/svelte/icons/ellipsis';

  const lights = [
    { color: '#FF5F57', glyph: '\u00d7', label: 'close' },
    { color: '#FEBC2E', glyph: '\u2212', label: 'minimize' },
    { color: '#28C840', glyph: '+', label: 'zoom' }
  ] as const;
</script>

<div
  class="grid h-10 grid-cols-[1fr_auto_1fr] items-center border-b border-border px-4"
  aria-hidden="true"
>
  <div class="group flex items-center gap-2 justify-self-start">
    {#each lights as light (light.label)}
      <span
        class="relative flex size-3 items-center justify-center rounded-full saturate-90 transition-opacity duration-[var(--dur-micro)] dark:saturate-100"
        style="background-color: {light.color}"
      >
        <span
          class="text-[8px] leading-none font-bold text-black/50 opacity-0 transition-opacity duration-[var(--dur-micro)] ease-[var(--ease-signature)] select-none group-hover:opacity-100"
        >
          {light.glyph}
        </span>
      </span>
    {/each}
  </div>

  <span class="justify-self-center font-mono text-xs tracking-tight text-muted-foreground">
    Afriansyah Yogatama
  </span>

  <Ellipsis class="size-4 justify-self-end text-muted-foreground" />
</div>
