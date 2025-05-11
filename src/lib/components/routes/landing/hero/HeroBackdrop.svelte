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

<div class="flex w-full grow flex-row justify-center gap-4" {...restProps}>
  {@render children()}
</div>
