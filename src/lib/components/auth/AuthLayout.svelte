<script lang="ts">
  import type { Snippet } from 'svelte';
  import Backdrop from './Backdrop.svelte';
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';

  let {
    children,
  }: {
    children?: Snippet;
  } = $props();
</script>

<div
  class="flex w-full grow flex-col justify-between md:items-center md:justify-center"
>
  <Backdrop />
  <Header />
  {#if children}
    <div
      class="mx-auto flex w-full max-w-2xl grow flex-col justify-between bg-white px-4 max-md:gap-8 md:absolute md:z-20 md:rounded-xl md:pt-12 md:pb-4 md:drop-shadow-2xl"
    >
      <div class="flex grow flex-col justify-center pb-4">
        {@render children()}
      </div>
    </div>
  {/if}
  <Footer />
</div>
