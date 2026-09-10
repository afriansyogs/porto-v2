<script lang="ts">
  import LoaderCircle from '@lucide/svelte/icons/loader-circle';
  import CircleCheckBig from '@lucide/svelte/icons/circle-check-big';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import type { FormState } from '$lib/types';
  import {
    contactSchema,
    toFieldErrors,
    type ContactActionResult,
    type ContactFieldErrors
  } from '$lib/schemas/contact';
  import { profile } from '$lib/data/profile';
  import SectionShell from '$lib/components/common/SectionShell.svelte';
  import GridBackground from '$lib/components/common/effects/GridBackground.svelte';
  import RadialGlow from '$lib/components/common/effects/RadialGlow.svelte';
  import SocialLinks from '$lib/components/common/SocialLinks.svelte';
  import ShineButton from '$lib/components/common/ShineButton.svelte';
  import { cn } from '$lib/utils';

  let formState = $state<FormState>({ status: 'idle' });
  let errors = $state<ContactFieldErrors>({});
  let shaking = $state(false);
  let name = $state('');
  let email = $state('');
  let message = $state('');

  const handleSubmit: SubmitFunction = ({ cancel }) => {
    const parsed = contactSchema.safeParse({
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    });
    if (!parsed.success) {
      cancel();
      errors = toFieldErrors(parsed.error);
      return;
    }
    errors = {};
    formState = { status: 'submitting' };

    return async ({ result }) => {
      if (result.type === 'success') {
        const data = result.data as ContactActionResult | undefined;
        if (data?.status === 'error') {
          formState = { status: 'error', message: data.message };
          errors = data.fieldErrors ?? {};
          shaking = true;
          return;
        }
        errors = {};
        formState = { status: 'success' };
        return;
      }
      formState = {
        status: 'error',
        message: 'The message could not be sent — please email me directly.'
      };
      shaking = true;
    };
  };

  const fieldClasses = (invalid: boolean): string =>
    cn(
      'w-full rounded-md border bg-transparent px-3.5 py-2.5 text-sm text-foreground transition-[border-color] duration-[var(--dur-micro)] ease-[var(--ease-signature)] placeholder:text-muted-foreground focus:border-foreground/40 focus:ring-4 focus:ring-foreground/[0.06] focus:outline-none dark:focus:ring-white/[0.06]',
      invalid ? 'border-destructive/70' : 'border-border'
    );

  const labelClasses =
    'mb-2 block font-mono text-[0.6875rem] font-medium tracking-[0.08em] text-muted-foreground uppercase';
</script>

<SectionShell
  id="contact"
  index="06"
  title="Initiate a handshake"
  lead="Got a full-time role or a challenging web project to ship? Let us discuss the architecture and technical requirements. Real specs get a reply within 24 hours."
>
  {#snippet background()}
    <GridBackground strong masked />
    <RadialGlow followCursor />
  {/snippet}

  <div class="grid items-start gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
    <div class="flex flex-col gap-9">
      <div>
        <p class={labelClasses}>Email</p>
        <a
          href={`mailto:${profile.email}`}
          class="-mx-1 block rounded px-1 text-lg font-medium tracking-tight break-all underline-offset-4 transition-colors duration-[var(--dur-micro)] ease-[var(--ease-signature)] hover:text-muted-foreground hover:underline focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:outline-none"
        >
          {profile.email}
        </a>
      </div>

      <div>
        <p class={labelClasses}>Location</p>
        <p class="text-lg font-medium tracking-tight">{profile.location}</p>
      </div>

      <div>
        <p class={labelClasses}>Socials</p>
        <SocialLinks class="mt-1.5 -ml-2" />
      </div>

      <div class="flex items-center gap-2.5">
        <span class="relative flex size-2" aria-hidden="true">
          <span class="pulse-ring absolute inline-flex size-full rounded-full bg-foreground"></span>
          <span class="relative inline-flex size-2 rounded-full bg-foreground"></span>
        </span>
        <p class="text-sm">
          <span class="font-medium">{profile.availability}</span>
          <span class="text-muted-foreground">- full-time or select freelance.</span>
        </p>
      </div>

      <p class="font-mono text-xs text-muted-foreground"></p>
    </div>

    {#if formState.status === 'success'}
      <div
        class="contact-swap flex flex-col items-center gap-4 rounded-xl glass p-10 text-center md:p-14"
      >
        <CircleCheckBig aria-hidden="true" strokeWidth={1.5} class="size-9" />
        <p class="font-mono text-sm tracking-tight">✓ message sent — talk soon.</p>
      </div>
    {:else}
      <form
        method="POST"
        action="?/send"
        novalidate
        use:enhance={handleSubmit}
        onanimationend={() => {
          shaking = false;
        }}
        class={cn('relative flex flex-col gap-5 rounded-xl glass p-6 md:p-8', shaking && 'shake')}
      >
        <div class="absolute -left-[9999px]" aria-hidden="true">
          <label for="contact-company">Company</label>
          <input id="contact-company" name="company" type="text" tabindex="-1" autocomplete="off" />
        </div>

        <div>
          <label for="contact-name" class={labelClasses}>Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your name"
            autocomplete="name"
            required
            maxlength={80}
            bind:value={name}
            aria-invalid={errors.name !== undefined || undefined}
            aria-describedby={errors.name !== undefined ? 'contact-name-error' : undefined}
            class={fieldClasses(errors.name !== undefined)}
          />
          {#if errors.name !== undefined}
            <p id="contact-name-error" class="mt-1.5 text-xs text-destructive">
              {errors.name}
            </p>
          {/if}
        </div>

        <div>
          <label for="contact-email" class={labelClasses}>Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="you@mail.com"
            autocomplete="email"
            required
            maxlength={160}
            bind:value={email}
            aria-invalid={errors.email !== undefined || undefined}
            aria-describedby={errors.email !== undefined ? 'contact-email-error' : undefined}
            class={fieldClasses(errors.email !== undefined)}
          />
          {#if errors.email !== undefined}
            <p id="contact-email-error" class="mt-1.5 text-xs text-destructive">
              {errors.email}
            </p>
          {/if}
        </div>

        <div>
          <label for="contact-message" class={labelClasses}>Message</label>
          <textarea
            id="contact-message"
            name="message"
            rows="5"
            placeholder="The project, the timeline, the budget range oe whatever you have."
            required
            maxlength={2000}
            bind:value={message}
            aria-invalid={errors.message !== undefined || undefined}
            aria-describedby={errors.message !== undefined ? 'contact-message-error' : undefined}
            class={cn(fieldClasses(errors.message !== undefined), 'resize-y')}></textarea>
          {#if errors.message !== undefined}
            <p id="contact-message-error" class="mt-1.5 text-xs text-destructive">
              {errors.message}
            </p>
          {/if}
        </div>

        {#if formState.status === 'error'}
          <p role="alert" class="text-sm text-destructive">
            {formState.message}
          </p>
        {/if}

        <ShineButton
          type="submit"
          size="lg"
          class="mt-1 w-full cursor-pointer"
          disabled={formState.status === 'submitting'}
        >
          {#if formState.status === 'submitting'}
            <LoaderCircle aria-hidden="true" strokeWidth={1.75} class="size-4 animate-spin" />
            Sending…
          {:else}
            Send Message
          {/if}
        </ShineButton>
      </form>
    {/if}
  </div>
</SectionShell>

<style>
  .shake {
    animation: shake 200ms var(--ease-signature);
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-6px);
    }
    75% {
      transform: translateX(6px);
    }
  }

  .contact-swap {
    animation: contact-swap var(--dur-base) var(--ease-signature);
  }

  @keyframes contact-swap {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .shake,
    .contact-swap {
      animation: none;
    }
  }
</style>
