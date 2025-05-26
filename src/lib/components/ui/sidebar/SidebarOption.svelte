<script lang="ts">
  import type { ClassValue } from 'svelte/elements';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  let {
    class: additionalStyles,
    option,
    ...restProps
  }: {
    class?: ClassValue | null | undefined;
    option: {
      text: string;
      slug: string;
    };
  } & HTMLAnchorAttributes = $props();
</script>

<a
  href={option.slug}
  class={[
    'font-poppins inline-flex w-full flex-row rounded-md border-0 bg-none px-2 py-2 text-left align-middle font-medium text-balance whitespace-nowrap text-gray-800 outline-transparent transition-colors duration-100 select-none hover:cursor-pointer hover:bg-blue-50 not-disabled:hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900/50 active:scale-[0.98] active:bg-blue-100 not-disabled:active:text-blue-900 disabled:cursor-not-allowed disabled:opacity-50',
    additionalStyles,
  ]}
  {...restProps}
>
  {option.text}
</a>
