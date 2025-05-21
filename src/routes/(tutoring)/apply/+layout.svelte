<script lang="ts">
  import { App } from '$lib/components/global/App.svelte';
  import ApplicationPanel from '$lib/components/routes/apply/ApplicationPanel.svelte';
  import Backdrop from '$lib/components/ui/Backdrop.svelte';
  import Copyright from '$lib/components/ui/Copyright.svelte';
  import Logo from '$lib/components/ui/Logo.svelte';
  import type { LayoutProps } from './$types';

  let { children }: LayoutProps = $props();
</script>

<div
  class="flex w-full grow flex-row justify-center bg-white transition-all duration-100"
>
  {#if App.viewport.width >= App.breakpoints.md}
    <Backdrop src="https://picsum.photos/seed/apply/1920/1080?blur=4" />
  {/if}
  <ApplicationPanel duration={200}>
    <div
      class="flex flex-row justify-center py-6 md:justify-start md:pt-12 md:pb-6"
    >
      <Logo
        href="/"
        class={{
          nexus: 'text-center text-base md:text-xl',
        }}
      />
    </div>
    {@render children()}
    <div class="flex grow flex-col justify-end py-4">
      <p class="flex items-center justify-center gap-4 text-center">
        <Copyright class="text-3xs text-center" />
      </p>
    </div>
  </ApplicationPanel>
</div>
