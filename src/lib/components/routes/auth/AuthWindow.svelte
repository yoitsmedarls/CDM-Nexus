<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { fade } from 'svelte/transition';

  let {
    title,
    duration = 100,
    searchParams,
    children,
    ...restProps
  }: {
    title: string;
    duration?: number;
    searchParams: URLSearchParams;
    children: Snippet;
  } & SvelteHTMLElements['main'] = $props();
</script>

<main
  in:fade={{ duration: duration }}
  class="mx-auto flex w-full max-w-lg grow flex-col justify-start gap-4 bg-transparent px-4 pt-8 pb-6 transition-all duration-100 md:absolute md:z-20 md:max-w-xl md:rounded-xl md:bg-white md:px-6 md:pt-10 md:drop-shadow-2xl"
  {...restProps}
>
  <h1
    class="font-poppins text-xl font-semibold whitespace-nowrap text-gray-800 md:text-2xl"
  >
    {title}
    {#if searchParams.get('redirectTo')}
      <p class="font-poppins pt-2 text-sm font-normal text-gray-800/75 italic">
        To continue, please {title.toLowerCase()}:
      </p>
    {/if}
  </h1>
  {@render children()}
</main>
