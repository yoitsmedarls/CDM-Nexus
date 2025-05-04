<script lang="ts">
  import type { Snippet } from 'svelte';
  import { App } from '../global/App.svelte';

  let {
    children,
  }: {
    children: Snippet;
  } = $props();
</script>

<header
  class="sticky top-0 z-50 flex min-h-fit w-full flex-col bg-white px-4 transition-all duration-100 md:px-6"
>
  <div
    class="flex min-h-16 w-full flex-row items-center justify-between transition-all duration-100 md:min-h-18"
  >
    {#if children}
      {@render children()}
    {/if}
  </div>
</header>
