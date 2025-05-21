<script lang="ts">
  import type { PageProps } from './$types';

  import { enhance } from '$app/forms';
  import Textarea from '$lib/components/ui/Textarea.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import AccountCard from '$lib/components/ui/AccountCard.svelte';
  import Separator from '$lib/components/ui/Separator.svelte';

  let { data, form }: PageProps = $props();

  let processing = $state(false);
</script>

<div class="flex flex-col justify-start pt-8 pb-4 md:pt-0">
  <h1 class="font-poppins text-xl font-medium whitespace-nowrap text-gray-800">
    Become a tutor!
  </h1>
</div>
<form
  class="flex flex-col gap-2"
  method="post"
  action="?/submitApplication"
  use:enhance={() => {
    processing = true;

    return async ({ update }) => {
      await update();
      processing = false;
    };
  }}
>
  <div class="flex flex-col justify-start gap-1 pt-2 pb-1">
    <div class="flex flex-row justify-between gap-2">
      <p class="font-poppins block text-sm font-medium text-gray-800">
        Your account
      </p>
      <Button
        variant="underline"
        formaction="?/switchAccount"
        class={{ span: 'text-xs font-normal' }}
      >
        Not you?
      </Button>
    </div>
    <div class="flex flex-col justify-start">
      {#if data.user}
        <AccountCard
          user={{
            username: data.user.username,
            cdmEmail: data.user.cdmEmail,
            role: data.user.role,
          }}
        />
      {/if}
    </div>
  </div>
  <Separator orientation="horizontal" />
  <Textarea
    name="message"
    placeholder="At the end of your message, indicate your grades in math-related courses.

Example:
MATH2074 - 1.00
MATH2094 - 1.25"
    disabled={processing}
  >
    Why do you want to become a tutor?
  </Textarea>
  <div class="mt-2 flex flex-col justify-center">
    <Button
      variant="primary"
      type="submit"
      disabled={processing}
      class={{ span: 'text-sm' }}
    >
      Submit Application
    </Button>
    <div class="flex flex-col py-2">
      <p
        class={[
          'font-poppins text-xs  transition-all duration-100 ',
          processing ? 'animate-pulse text-blue-900' : 'text-red-600',
        ]}
      >
        {processing ? 'Processing...' : form?.message}
      </p>
    </div>
  </div>
</form>
