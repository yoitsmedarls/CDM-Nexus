<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children?: Snippet } = $props();
</script>

{#if children}
  <aside
    class="xl:bg-cdm-blue-50 flex w-full flex-col gap-2 rounded-md px-2 py-4 transition-all duration-200 md:w-[25%] md:max-w-xs md:min-w-[16rem] md:bg-gray-50 xl:h-fit"
  >
    {@render children()}
  </aside>
{/if}
