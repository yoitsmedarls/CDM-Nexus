<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  let {
    children,
    ...restProps
  }: {
    children: Snippet;
  } & HTMLAnchorAttributes = $props();
</script>

<a
  class="font-poppins block max-h-fit min-h-fit max-w-fit min-w-fit rounded-md border-2 border-blue-800 bg-white px-4 py-2 text-center text-base font-semibold text-balance whitespace-nowrap text-blue-800 drop-shadow-xs transition-all duration-100 select-none hover:cursor-pointer not-disabled:hover:bg-blue-800 not-disabled:hover:text-white focus-visible:border-blue-800 focus-visible:bg-blue-800 focus-visible:text-white focus-visible:ring-0 focus-visible:outline-0 active:scale-[0.99] not-disabled:active:border-blue-900 not-disabled:active:bg-blue-900 not-disabled:active:text-white md:text-lg"
  {...restProps}
>
  {@render children()}
</a>
