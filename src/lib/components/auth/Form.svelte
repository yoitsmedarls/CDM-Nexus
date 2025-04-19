<script lang="ts">
  import { enhance } from '$app/forms';
  import type { Snippet } from 'svelte';

  let {
    title = '',
    redirectTo = '',
    message = '',
    authSwitcher = '',
    authSwitcherText = '',
    processing = false,
    children,
  }: {
    title?: string;
    redirectTo?: string;
    message?: string;
    authSwitcher?: string;
    authSwitcherText?: string;
    processing?: boolean;
    children?: Snippet;
  } = $props();
</script>

<main
  class="mx-auto flex w-full grow flex-col justify-start gap-4 max-md:max-w-lg max-md:gap-8 max-md:pt-4 md:px-4"
>
  <h1 class="font-poppins text-xl font-semibold text-gray-800 md:text-2xl">
    {title}
  </h1>
  <form
    class="flex flex-col gap-2"
    method="post"
    use:enhance={() => {
      processing = true;

      return async ({ update }) => {
        await update();
        processing = false;
      };
    }}
  >
    {#if children}
      {@render children()}
    {/if}
  </form>
  <div class="flex flex-row justify-between gap-2">
    <p
      class={[
        'font-poppins text-xs md:text-sm',
        processing ? 'text-blue-900' : 'text-red-600',
      ]}
    >
      {#if processing}
        Processing...
      {:else}
        {message}
      {/if}
    </p>
    <a
      href={redirectTo ? authSwitcher + redirectTo : authSwitcher}
      class="font-poppins text-right text-xs text-balance text-gray-800 hover:text-blue-900 active:text-blue-950 md:text-sm"
    >
      {authSwitcherText}
    </a>
  </div>
</main>
