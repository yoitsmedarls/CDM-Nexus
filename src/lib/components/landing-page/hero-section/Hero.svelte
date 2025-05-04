<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    children,
  }: {
    children: Snippet;
  } = $props();
</script>

<div
  class="xs:px-6 flex grow flex-col justify-start px-4 pb-4 transition-all duration-100 md:px-8"
>
  {#if children}
    {@render children()}
  {/if}
</div>
