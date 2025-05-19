<script lang="ts">
  import type { PageProps } from './$types';

  import { enhance } from '$app/forms';
  import { page } from '$app/state';

  import { App } from '$lib/components/global/App.svelte';
  import AuthHeader from '$lib/components/routes/auth/AuthHeader.svelte';
  import AuthWindow from '$lib/components/routes/auth/AuthWindow.svelte';
  import AuthFooter from '$lib/components/routes/auth/AuthFooter.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Backdrop from '$lib/components/ui/Backdrop.svelte';
  import Copyright from '$lib/components/ui/Copyright.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Logo from '$lib/components/ui/Logo.svelte';

  let { form }: PageProps = $props();

  let processing = $state(false);
</script>

<svelte:head>
  <title>Sign up | CDM Nexus</title>
  <meta name="description" content="Sign up for a CDM Nexus account." />
</svelte:head>

<div
  class="flex w-full grow flex-col justify-between bg-white transition-all duration-100 md:items-center md:justify-center"
>
  {#if App.viewport.width >= App.breakpoints.md}
    <Backdrop
      duration={200}
      src="https://picsum.photos/seed/cdm/1920/1080?blur=4"
    />
  {/if}
  <AuthHeader>
    <Logo
      href="/"
      class={{
        cdm: 'md:font-bold md:text-white',
        nexus:
          'text-center text-base md:text-lg md:font-bold md:text-white md:opacity-35',
      }}
    />
  </AuthHeader>
  <AuthWindow
    title="Sign up"
    duration={200}
    searchParams={page.url.searchParams}
  >
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
      <Input
        type="text"
        name="fullname"
        autocomplete="name"
        placeholder="Juan Dela Cruz"
        disabled={processing}
      >
        Full Name
      </Input>
      <Input
        type="email"
        name="cdmemail"
        autocomplete="email"
        placeholder="your.cdm.email@cdm.edu.ph"
        disabled={processing}
      >
        CDM Email
      </Input>
      <Input
        type="text"
        name="username"
        autocomplete="username"
        placeholder="Username"
        disabled={processing}
      >
        Username
      </Input>
      <Input
        type="password"
        name="password"
        autocomplete="new-password"
        placeholder="Password"
        disabled={processing}
      >
        Password
      </Input>
      <div class="mt-2 flex flex-col justify-center">
        <Button
          variant="primary"
          type="submit"
          disabled={processing}
          class={{ span: 'text-sm md:text-base' }}
        >
          Sign Up
        </Button>
      </div>
    </form>
    <div class="flex flex-row justify-between gap-2">
      <p
        class={[
          'font-poppins text-xs transition-all duration-100 md:text-sm',
          processing ? 'animate-pulse text-blue-900' : 'text-red-600',
        ]}
      >
        {processing ? 'Processing...' : form?.message}
      </p>
      <Button
        variant="underline"
        href={`/login${page.url.searchParams.get('redirectTo') ? '?redirectTo=' + page.url.searchParams.get('redirectTo') : ''}`}
        class={{ span: 'text-right text-xs font-normal md:text-sm' }}
      >
        Have an account?
      </Button>
    </div>
  </AuthWindow>
  <AuthFooter>
    <Copyright
      class="text-3xs md:text-2xs text-center md:text-white md:opacity-30"
    />
  </AuthFooter>
</div>
