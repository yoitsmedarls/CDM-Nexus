<script lang="ts">
  import { NavigationMenu } from 'bits-ui';
  import type { ClassValue } from 'svelte/elements';

  let {
    class: additionalStyles,
    option,
  }: {
    class?: ClassValue | null | undefined;
    option: {
      text: string;
      slug: string;
    };
  } = $props();
</script>

<NavigationMenu.Item>
  <NavigationMenu.Link
    href={option.slug}
    class={[
      'font-poppins inline-flex max-h-fit min-h-fit max-w-fit min-w-fit flex-row justify-center rounded-md border-0 bg-none px-2 py-1 text-center align-middle font-medium text-balance text-gray-800 outline-transparent transition-colors duration-100 hover:cursor-pointer not-disabled:hover:text-blue-800  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900/50 active:scale-[0.98] not-disabled:active:text-blue-900 disabled:cursor-not-allowed disabled:opacity-50',
      additionalStyles,
    ]}
  >
    {option.text}
  </NavigationMenu.Link>
</NavigationMenu.Item>
