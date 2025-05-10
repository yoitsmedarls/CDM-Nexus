<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';

  let {
    children,
    ...restProps
  }: {
    children: Snippet;
  } & SvelteHTMLElements['div'] = $props();
</script>

<div
  class="flex h-16 w-full flex-row items-center justify-between gap-2 px-3 transition-all duration-100 md:h-18"
  {...restProps}
>
  {@render children()}
</div>
