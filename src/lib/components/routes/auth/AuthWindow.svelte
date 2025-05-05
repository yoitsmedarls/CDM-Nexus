<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';

  let {
    title,
    children,
    ...restProps
  }: {
    title: string;
    children: Snippet;
  } & SvelteHTMLElements['main'] = $props();
</script>

<main
  class="mx-auto flex w-full max-w-2xl grow flex-col justify-start gap-4 bg-transparent px-4 pt-8 pb-6 transition-all duration-100 max-md:max-w-lg md:absolute md:z-20 md:rounded-xl md:bg-white md:px-6 md:pt-10 md:drop-shadow-2xl"
  {...restProps}
>
  <h1
    class="font-poppins text-xl font-semibold whitespace-nowrap text-gray-800 md:text-2xl"
  >
    {title}
  </h1>
  {@render children()}
</main>
