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
  class="flex grow flex-col justify-start px-4 pb-4 transition-all duration-200 md:px-6"
  {...restProps}
>
  {@render children()}
</div>
