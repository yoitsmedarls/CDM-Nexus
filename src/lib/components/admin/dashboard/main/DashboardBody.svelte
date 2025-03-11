<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children?: Snippet } = $props();
</script>

<div
  class="flex grow flex-col rounded-b-md border-gray-200 p-2 xl:border-x-1 xl:border-b-1"
>
  {#if children}
    {@render children()}
  {/if}
</div>
