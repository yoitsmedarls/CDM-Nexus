<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';

  let {
    children,
    ...restProps
  }: {
    children: Snippet;
  } & SvelteHTMLElements['footer'] = $props();
</script>

<footer class="pb-4 md:absolute md:bottom-0 md:z-10" {...restProps}>
  {@render children()}
</footer>
