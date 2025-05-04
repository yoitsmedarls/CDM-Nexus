<script lang="ts">
  import type { Snippet } from 'svelte';
  import { fade } from 'svelte/transition';

  let {
    transitionDuration,
    children,
  }: {
    transitionDuration: number;
    children: Snippet;
  } = $props();
</script>

<nav
  in:fade={{ duration: transitionDuration }}
  class="flex flex-row items-center gap-4"
>
  {#if children}
    {@render children()}
  {/if}
</nav>
