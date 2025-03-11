<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children?: Snippet } = $props();
</script>

<main
  class="flex w-full grow flex-col overflow-clip transition-all duration-200"
>
  {#if children}
    {@render children()}
  {/if}
</main>
