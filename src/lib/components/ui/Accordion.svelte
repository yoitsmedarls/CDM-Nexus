<script lang="ts">
  import { Accordion, type WithoutChildrenOrChild } from 'bits-ui';
  import CaretDown from 'phosphor-svelte/lib/CaretDown';
  import { slide } from 'svelte/transition';

  type Item = {
    value?: string;
    title: string;
    content: string;
    disabled?: boolean;
  };

  let {
    items,
    value = $bindable(),
    ref = $bindable(null),
    ...restProps
  }: WithoutChildrenOrChild<Accordion.RootProps> & {
    items: Item[];
  } = $props();
</script>

<!--
 Since we have to destructure the `value` to make it `$bindable`, we need to use `as any` here to avoid
 type errors from the discriminated union of `"single" | "multiple"`.
 (an unfortunate consequence of having to destructure bindable values)
  -->
<Accordion.Root
  class="w-full rounded-md p-2"
  bind:value
  bind:ref
  {...restProps as any}
>
  {#each items as item, i (item.title + i)}
    <Accordion.Item class="group border-b border-gray-200">
      <Accordion.Header>
        <Accordion.Trigger
          class="font-poppins flex w-full grow cursor-pointer items-center justify-between rounded-xs px-2 py-3 text-left text-base font-medium text-gray-800 underline-offset-4 transition-all duration-100 hover:underline focus-visible:underline focus-visible:outline-0 active:text-blue-900 active:underline active:underline-offset-4 [&[data-state=open]]:text-blue-900 [&[data-state=open]>span>svg]:rotate-180"
        >
          {item.title}
          <span
            class="inline-flex size-8 items-center justify-center rounded-md"
          >
            <CaretDown class="size-5 transition-all duration-200" />
          </span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content forceMount={true} class="overflow-ellipsis">
        {#snippet child({ props, open })}
          {#if open}
            <div
              {...props}
              transition:slide={{ duration: 250 }}
              class="font-nunito px-2 pb-6 text-base text-gray-800"
            >
              {item.content}
            </div>
          {/if}
        {/snippet}
      </Accordion.Content>
    </Accordion.Item>
  {/each}
</Accordion.Root>
