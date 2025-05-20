<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { fade } from 'svelte/transition';

  let {
    duration = 100,
    children,
    ...restProps
  }: {
    duration?: number;
    children: Snippet;
  } & SvelteHTMLElements['main'] = $props();
</script>

<main
  in:fade={{ duration: duration }}
  class="flex w-full max-w-lg grow flex-col justify-start bg-white px-4 transition-all duration-100 md:fixed md:top-0 md:right-0 md:bottom-0 md:max-w-sm md:bg-white md:px-6 md:drop-shadow-xl"
  {...restProps}
>
  {@render children()}
</main>
