<script lang="ts">
  import { Combobox, type WithoutChildrenOrChild, mergeProps } from 'bits-ui';
  import CaretUpDown from 'phosphor-svelte/lib/CaretUpDown';
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
  import Check from 'phosphor-svelte/lib/Check';
  import CaretDoubleUp from 'phosphor-svelte/lib/CaretDoubleUp';
  import CaretDoubleDown from 'phosphor-svelte/lib/CaretDoubleDown';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  type Props = Combobox.RootProps & {
    inputProps?: WithoutChildrenOrChild<Combobox.InputProps>;
    contentProps?: WithoutChildrenOrChild<Combobox.ContentProps>;
  };

  let {
    items = [],
    value = $bindable(),
    open = $bindable(false),
    inputProps,
    contentProps,
    type,
    ...restProps
  }: Props = $props();

  let searchValue = $state('');

  const filteredItems = $derived.by(() => {
    if (searchValue === '') return items;
    return items.filter((item) =>
      item.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  function handleInput(e: Event & { currentTarget: HTMLInputElement }) {
    searchValue = e.currentTarget.value;
  }

  function handleOpenChange(newOpen: boolean) {
    if (!newOpen) searchValue = '';
  }

  const mergedRootProps = $derived(
    mergeProps(restProps, { onOpenChange: handleOpenChange })
  );
  const mergedInputProps = $derived(
    mergeProps(inputProps, { oninput: handleInput })
  );

  function autoScrollDelay(tick: number) {
    const maxDelay = 200;
    const minDelay = 25;
    const steps = 30;

    const progress = Math.min(tick / steps, 1);

    return maxDelay - (maxDelay - minDelay) * cubicOut(progress);
  }
</script>

<!--
Destructuring (required for bindable) and discriminated unions don't play well together,
so we cast the value to `never` to avoid type errors here. However, on the consumer
side, the component will still be type-checked correctly.
-->
<Combobox.Root
  {type}
  {items}
  bind:value={value as never}
  bind:open
  {...mergedRootProps}
>
  <div class="relative flex flex-row items-center justify-between gap-2">
    <Combobox.Input
      {...mergedInputProps}
      class="font-poppins peer inline-flex h-10 w-full truncate rounded-md border border-gray-200 bg-white pr-8 pl-10 align-middle text-base text-gray-800 outline-2 outline-offset-2 outline-transparent transition-all duration-100 placeholder:text-gray-800/50 focus-within:text-blue-950 hover:border-gray-800/50 focus-visible:border-blue-950 focus-visible:ring-0 focus-visible:outline-blue-950/50 focus-visible:placeholder:text-blue-950/75"
    />
    <MagnifyingGlass
      class="absolute start-2 size-6 cursor-pointer text-gray-800/50 peer-focus-within:text-blue-950"
    />
    <Combobox.Trigger
      tabindex={-1}
      class="absolute end-1 top-1/2 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-gray-800/50 peer-focus-within:text-blue-950"
    >
      <CaretUpDown class="size-5" />
    </Combobox.Trigger>
  </div>
  <Combobox.Portal>
    <Combobox.Content
      preventScroll={true}
      forceMount
      {...contentProps}
      class="h-[var(--bits-combobox-content-available-height)] max-h-80 w-[var(--bits-combobox-anchor-width)] min-w-[var(--bits-combobox-anchor-width)] rounded-md border border-gray-200 bg-white p-2 outline-hidden drop-shadow-xs"
      sideOffset={10}
    >
      {#snippet child({ wrapperProps, props, open })}
        {#if open}
          <div {...wrapperProps}>
            <div
              {...props}
              transition:fly={{
                duration: 200,
              }}
            >
              <Combobox.ScrollUpButton
                delay={autoScrollDelay}
                class="flex w-full items-center justify-center py-1 transition-colors duration-100 hover:text-blue-950"
              >
                <CaretDoubleUp class="size-3" />
              </Combobox.ScrollUpButton>
              <Combobox.Viewport class="">
                {#each filteredItems as item, i (i + item.value)}
                  <Combobox.Item
                    {...item}
                    class="font-nunito flex h-fit w-full cursor-pointer items-center justify-between rounded-md py-2 pr-2 pl-6 text-sm text-gray-800 capitalize outline-hidden transition-all duration-100 select-none data-highlighted:bg-blue-50 data-highlighted:text-blue-950"
                  >
                    {#snippet children({ selected })}
                      <span>
                        {item.label}
                      </span>
                      {#if selected}
                        <div class="p-1">
                          <Check class="size-4" />
                        </div>
                      {/if}
                    {/snippet}
                  </Combobox.Item>
                {:else}
                  <span
                    class="block px-6 py-1 text-sm text-gray-800 font-nunito"
                  >
                    No results found
                  </span>
                {/each}
              </Combobox.Viewport>
              <Combobox.ScrollDownButton
                delay={autoScrollDelay}
                class="flex w-full items-center justify-center py-1 transition-colors duration-100 hover:text-blue-950"
              >
                <CaretDoubleDown class="size-3" />
              </Combobox.ScrollDownButton>
            </div>
          </div>
        {/if}
      {/snippet}
    </Combobox.Content>
  </Combobox.Portal>
</Combobox.Root>
