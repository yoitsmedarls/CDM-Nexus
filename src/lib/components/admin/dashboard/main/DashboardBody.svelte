<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children?: Snippet } = $props();
</script>

<div class="flex grow flex-col rounded-b-md p-2">
  {#if children}
    {@render children()}
  {/if}
</div>
