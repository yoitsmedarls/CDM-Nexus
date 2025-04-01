<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children?: Snippet } = $props();
</script>

<main
  class="flex w-full grow flex-col overflow-clip rounded-md border-gray-200 transition-all duration-200 xl:border-1"
>
  {#if children}
    {@render children()}
  {/if}
</main>
