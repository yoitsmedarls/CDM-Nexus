<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLTextareaAttributes } from 'svelte/elements';

  let {
    children,
    ...restProps
  }: {
    children: Snippet;
  } & HTMLTextareaAttributes = $props();
</script>

<label class="block w-full">
  <span class="font-poppins block py-1 text-sm text-gray-800">
    {@render children()}
  </span>
  <textarea
    class="font-nunito block field-sizing-content max-h-80 w-full resize-none rounded-md border border-gray-200 px-2.5 pt-2 pb-4 align-middle text-sm leading-tight font-normal text-gray-800 outline-0 transition-[color,_background-color,_border-color,_outline-color,_text-decoration-color,_fill,_stroke] duration-100 placeholder:text-gray-800/50 hover:border-gray-800/50 focus:border-blue-800 focus:ring-blue-800 focus:placeholder:text-gray-800/60 disabled:cursor-not-allowed disabled:opacity-50"
    {...restProps}
  ></textarea>
</label>
