<script lang="ts">
  import { NavigationMenu } from 'bits-ui';
  import type { ClassValue } from 'svelte/elements';
  import NavigationMenuItem from './NavigationMenuItem.svelte';

  import CaretDown from 'phosphor-svelte/lib/CaretDown';

  let {
    class: additionalStyles,
    trigger,
    options,
  }: {
    class?: ClassValue | null | undefined;
    trigger: string;
    options: {
      text: string;
      slug: string;
    }[];
  } = $props();
</script>

<NavigationMenu.Item>
  <NavigationMenu.Trigger
    class={[
      'font-poppins group inline-flex max-h-fit min-h-fit max-w-fit min-w-fit flex-row justify-center rounded-md border-0 bg-none px-2 py-1 text-center align-middle font-medium text-balance whitespace-nowrap text-gray-800 outline-transparent transition-colors duration-100 select-none hover:cursor-pointer not-disabled:hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900/50 active:scale-[0.98] not-disabled:active:text-blue-900 disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:text-blue-800 data-[state=open]:underline data-[state=open]:underline-offset-3',
      additionalStyles,
    ]}
  >
    {trigger}
    <CaretDown
      class="my-auto ml-1 size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenu.Trigger>
  <NavigationMenu.Content
    forceMount
    interactOutsideBehavior="close"
    class="data-[motion=from-end]:animate-enter-from-right data-[motion=from-start]:animate-enter-from-left data-[motion=to-end]:animate-exit-to-right data-[motion=to-start]:animate-exit-to-left w-fit list-none p-2"
  >
    {#each options as option (option.slug)}
      <NavigationMenuItem
        {option}
        class="w-full pr-4 text-left hover:bg-blue-50 active:bg-blue-100"
      />
    {/each}
  </NavigationMenu.Content>
</NavigationMenu.Item>
