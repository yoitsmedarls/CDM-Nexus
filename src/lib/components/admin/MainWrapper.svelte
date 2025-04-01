<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    children,
    addPadding = false,
  }: { children?: Snippet; addPadding?: boolean } = $props();
</script>

<main
  class={[
    'flex w-full grow flex-col overflow-clip rounded-md border-gray-200 transition-all duration-200 xl:border-1',
    { addPadding },
  ]}
>
  {#if children}
    {@render children()}
  {/if}
</main>

<style>
  .addPadding {
    padding: 0.5rem;
  }
</style>
