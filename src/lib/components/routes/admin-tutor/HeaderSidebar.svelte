<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';

  import { fade } from 'svelte/transition';

  let {
    duration = 100,
    viewportWidth,
    viewportTrigger,
    scrollValue,
    scrollTrigger,
    children,
    ...restProps
  }: {
    duration?: number;
    viewportWidth: number;
    viewportTrigger: number;
    scrollValue: number;
    scrollTrigger: number;
    children: Snippet;
  } & SvelteHTMLElements['div'] = $props();
</script>

{#if viewportWidth < viewportTrigger}
  {#if scrollValue > scrollTrigger}
    <div
      transition:fade={{ delay: duration, duration: duration }}
      class="fixed top-0 right-0 left-0 z-50 flex h-14 w-full flex-row justify-center bg-white drop-shadow-sm transition-all duration-100 md:h-16"
    >
      <div
        class="mx-auto flex h-full w-full flex-row items-center justify-between gap-2 px-3 transition-all duration-100"
        {...restProps}
      >
        {@render children()}
      </div>
    </div>
  {/if}
  <div
    in:fade={{ duration: duration }}
    class="flex h-14 w-full flex-row items-center justify-between gap-2 bg-transparent px-3 transition-all duration-100 md:h-16"
    {...restProps}
  >
    {#if scrollValue <= scrollTrigger}
      {@render children()}
    {/if}
  </div>
{:else}
  <div
    in:fade={{ duration: duration }}
    class="sticky top-0 bottom-0 left-0 flex h-svh w-max flex-col p-2"
  >
    <div
      class="flex grow flex-col justify-between gap-4 overflow-y-auto rounded-md border border-gray-200 bg-white px-3 pt-6 pb-4 drop-shadow-xs transition-all duration-100"
    >
      {@render children()}
    </div>
  </div>
{/if}
