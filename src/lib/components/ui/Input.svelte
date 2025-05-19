<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';

  let {
    children,
    ...restProps
  }: {
    children: Snippet;
  } & SvelteHTMLElements['input'] = $props();
</script>

<label class="block w-full min-w-fit">
  <span class="font-poppins block py-1 text-sm text-gray-800 md:text-base">
    {@render children()}
  </span>
  <input
    class="font-nunito block w-full rounded-md border border-gray-200 p-2 pl-2.5 align-middle text-sm leading-tight text-gray-800 outline-0 transition-all duration-100 placeholder:text-gray-800/50 hover:border-gray-800/50 focus:border-blue-800 focus:ring-blue-800 focus:placeholder:text-gray-800/60 md:text-base"
    {...restProps}
  />
</label>
