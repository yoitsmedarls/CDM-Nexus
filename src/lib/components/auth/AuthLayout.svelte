<script lang="ts">
  import type { Snippet } from 'svelte';

  import Backdrop from '$lib/components/auth/layout/Backdrop.svelte';
  import Header from '$lib/components/auth/layout/Header.svelte';
  import Footer from '$lib/components/auth/layout/Footer.svelte';
  import { App } from '../global/App.svelte';

  let {
    children,
  }: {
    children?: Snippet;
  } = $props();
</script>

<div
  class="flex w-full grow flex-col justify-between bg-white transition-all duration-100 md:items-center md:justify-center"
>
  {#if App.viewport.width >= App.breakpoints.md}
    <Backdrop transitionDuration={200} />
  {/if}
  <Header />
  {#if children}
    <div
      class="mx-auto flex w-full max-w-2xl grow flex-col justify-between bg-white px-4 transition-all duration-100 max-md:gap-8 md:absolute md:z-20 md:rounded-xl md:px-2 md:pt-10 md:pb-2 md:drop-shadow-2xl"
    >
      <div class="flex grow flex-col justify-center pb-4">
        {@render children()}
      </div>
    </div>
  {/if}
  <Footer />
</div>
