<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements';

  let {
    class: additionalStyles,
    ...restProps
  }: {
    class?: string | undefined;
  } & SvelteHTMLElements['p'] = $props();
</script>

<p
  class={[
    'font-nunito text-gray-800/50 transition-all duration-100 select-none',
    additionalStyles,
  ]}
  {...restProps}
>
  &copy; {new Date().getFullYear()} CDM Nexus. All rights reserved.
</p>
