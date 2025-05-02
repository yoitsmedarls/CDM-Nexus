<script lang="ts">
  import { Collapsible, type WithoutChild } from 'bits-ui';
  import { fade } from 'svelte/transition';
  import CaretUpDown from 'phosphor-svelte/lib/CaretUpDown';

  type Props = WithoutChild<Collapsible.RootProps> & {
    label: string;
  };

  let {
    open = $bindable(false),
    ref = $bindable(null),
    label,
    children,
    ...restProps
  }: Props = $props();
</script>

<Collapsible.Root
  bind:open
  bind:ref
  {...restProps}
  class="rounded-md border p-2 transition-all duration-100 data-[state=closed]:border-transparent data-[state=open]:border-gray-200 data-[state=open]:bg-white data-[state=open]:drop-shadow-xs"
>
  <div class="flex flex-row items-center justify-between gap-2 pb-2">
    <h4 class="font-poppins text-lg text-gray-800">
      {label}
    </h4>
    <Collapsible.Trigger
      class="font-poppins inline-flex max-h-fit min-h-6 max-w-fit min-w-6 flex-row justify-start gap-3 overflow-clip rounded-md border-1 border-gray-100 bg-white p-2 text-center align-middle font-medium text-balance text-gray-800 outline-transparent drop-shadow-xs transition-colors duration-100 focus-within:outline-gray-400/50 hover:cursor-pointer not-disabled:hover:border-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] not-disabled:active:border-gray-300 not-disabled:active:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <CaretUpDown class="size-4" weight="bold" />
    </Collapsible.Trigger>
  </div>
  <Collapsible.Content forceMount class="flex flex-col gap-2">
    {#snippet child({ props, open })}
      {#if open}
        <div {...props} transition:fade={{ duration: 100 }}>
          {@render children?.()}
        </div>
      {/if}
    {/snippet}
  </Collapsible.Content>
</Collapsible.Root>
