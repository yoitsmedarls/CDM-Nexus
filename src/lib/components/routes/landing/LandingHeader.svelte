<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';

  import { fade } from 'svelte/transition';

  let {
    duration = 100,
    scrollValue,
    scrollTrigger,
    children,
    ...restProps
  }: {
    duration?: number;
    scrollValue: number;
    scrollTrigger: number;
    children: Snippet;
  } & SvelteHTMLElements['div'] = $props();
</script>

{#if scrollValue > scrollTrigger}
  <div
    transition:fade={{ duration: duration }}
    class="fixed top-0 right-0 left-0 z-50 flex h-14 w-full flex-row justify-center bg-white drop-shadow-sm transition-all duration-100 md:h-16"
  >
    <div
      class="mx-auto flex h-full w-full max-w-[88rem] flex-row items-center justify-between gap-2 px-3 transition-all duration-100"
      {...restProps}
    >
      {@render children()}
    </div>
  </div>
{/if}

<div
  class="flex h-14 w-full flex-row items-center justify-between gap-2 bg-transparent px-3 transition-all duration-100 md:h-16"
  {...restProps}
>
  {#if scrollValue <= scrollTrigger}
    {@render children()}
  {/if}
</div>
