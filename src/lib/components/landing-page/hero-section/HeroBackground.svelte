<script lang="ts">
  import { blur } from 'svelte/transition';
  import { App } from '$lib/components/global/App.svelte';

  let {
    transitionDuration,
  }: {
    transitionDuration: number;
  } = $props();
</script>

<div class="flex w-full grow flex-row justify-center gap-4">
  {#if App.viewport.width >= App.breakpoints.xs}
    <div
      in:blur={{ duration: transitionDuration }}
      class="left-image w h-[40svh] max-h-[36em] min-h-[18em] max-w-[12em] min-w-[4em] grow self-start rounded-b-full bg-yellow-500 bg-cover bg-center p-4 drop-shadow-xs"
    ></div>
    <div
      in:blur={{ duration: transitionDuration }}
      class="main-image grow-7 rounded-md bg-blue-900 bg-cover bg-center p-4 drop-shadow-xs"
    ></div>
    <div
      in:blur={{ duration: transitionDuration }}
      class="right-image h-[40svh] max-h-[36em] min-h-[18em] max-w-[12em] min-w-[4em] grow self-end rounded-t-full bg-red-600 bg-cover bg-center p-4 drop-shadow-xs"
    ></div>
  {:else}
    <div
      in:blur={{ duration: transitionDuration }}
      class="main-image grow-7 rounded-md bg-blue-900 bg-cover bg-center p-4 drop-shadow-xs"
    ></div>
  {/if}
</div>

<style>
  /* TODO: Use proper pictures specified by CDM Nexus. */
  .left-image {
    background-image: url(https://picsum.photos/seed/c/1440?blur=8);
  }
  .main-image {
    background-image: url(https://picsum.photos/seed/d/1440);
  }
  .right-image {
    background-image: url(https://picsum.photos/seed/m/1440?blur=8);
  }
</style>
