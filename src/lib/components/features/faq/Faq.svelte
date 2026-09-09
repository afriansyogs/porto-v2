<script lang="ts">
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import SectionShell from '$lib/components/common/SectionShell.svelte';
  import DotPattern from '$lib/components/common/effects/DotPattern.svelte';
  import { faq } from '$lib/data/faq';
  import { cn } from '$lib/utils';

  let openIndex = $state<number | null>(0);
</script>

<SectionShell
  id="faq"
  index="05"
  title="The Essentials"
  lead="Direct answers to the most common questions before we start collaborating. Verified constraints, zero diplomatic padding, and strictly focused on engineering realities.."
>
  {#snippet background()}
    <DotPattern masked />
  {/snippet}

  <div class="mx-auto w-full">
    <div class="flex flex-col gap-3">
      {#each faq as item, index (item.question)}
        {@const isOpen = openIndex === index}
        {@const number = String(index + 1).padStart(2, '0')}
        <div
          class="rounded-[10px] glass-soft transition-colors duration-[var(--dur-base)] ease-[var(--ease-signature)]"
          style={isOpen
            ? 'border-color: color-mix(in oklab, var(--foreground) 25%, transparent)'
            : undefined}
        >
          <h3>
            <button
              type="button"
              id={`faq-trigger-${index}`}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
              onclick={() => {
                openIndex = isOpen ? null : index;
              }}
              class="flex w-full items-center gap-4 px-5 py-4 text-left focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:outline-none focus-visible:ring-inset md:px-6"
            >
              <span
                class="font-mono text-[0.6875rem] tracking-[0.08em] text-muted-foreground tabular-nums"
              >
                {number}
              </span>
              <span class="flex-1 text-sm font-medium md:text-base">{item.question}</span>
              <ChevronDown
                aria-hidden="true"
                strokeWidth={1.75}
                class={cn(
                  'size-4 shrink-0 text-muted-foreground transition-transform duration-[var(--dur-base)] ease-[var(--ease-signature)]',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
          </h3>

          <div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-trigger-${index}`}
            class={cn(
              'grid duration-[var(--dur-base)] ease-[var(--ease-signature)] motion-safe:transition-[grid-template-rows,opacity,visibility]',
              isOpen ? 'visible grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
            )}
          >
            <div class="overflow-hidden">
              <p
                class="px-5 pb-5 pl-12 text-sm leading-relaxed text-muted-foreground md:px-6 md:pl-[3.625rem]"
              >
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</SectionShell>
