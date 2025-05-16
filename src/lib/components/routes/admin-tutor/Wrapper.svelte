<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div
  class="relative flex w-full grow flex-row transition-all duration-100 xl:gap-2"
>
  {@render children()}
</div>
