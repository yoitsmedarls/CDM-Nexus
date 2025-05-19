<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { fade } from 'svelte/transition';

  let {
    title,
    duration = 100,
    children,
    ...restProps
  }: {
    title: string;
    duration?: number;
    children: Snippet;
  } & SvelteHTMLElements['main'] = $props();
</script>

<main
  in:fade={{ duration: duration }}
  class="flex w-full max-w-lg grow flex-col justify-start gap-4 bg-white px-4 pt-8 pb-6 transition-all duration-100 md:fixed md:top-0 md:right-0 md:bottom-0 md:max-w-md md:bg-white md:px-6 md:pt-10 md:drop-shadow-xl"
  {...restProps}
>
  {@render children()}
</main>
