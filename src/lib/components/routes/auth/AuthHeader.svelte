<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';

  let {
    children,
    ...restProps
  }: {
    children: Snippet;
  } & SvelteHTMLElements['header'] = $props();
</script>

<header
  class="flex w-full flex-row items-center justify-center py-6 transition-all duration-100 md:fixed md:top-0 md:right-0 md:left-0 md:px-6"
  {...restProps}
>
  {@render children()}
</header>
