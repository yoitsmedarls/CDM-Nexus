<script lang="ts">
  import type { Snippet } from 'svelte';
  import { ContextMenu, type WithoutChild } from 'bits-ui';
  import { fly } from 'svelte/transition';
  type Props = ContextMenu.RootProps & {
    trigger: Snippet;
    content: {
      groups: {
        heading: string;
        items: {
          text: string;
        }[];
      }[];
    };
    contentProps?: WithoutChild<ContextMenu.ContentProps>;
  };
  let {
    open = $bindable(false),
    children,
    trigger,
    content,
    contentProps,
    ...restProps
  }: Props = $props();
</script>

<ContextMenu.Root bind:open {...restProps}>
  <ContextMenu.Trigger>
    {@render trigger()}
  </ContextMenu.Trigger>
  <ContextMenu.Portal>
    <ContextMenu.Content
      forceMount
      class="min-w-60 rounded-md border border-gray-200 bg-white p-2 drop-shadow-xs outline-none focus-visible:outline-none"
      {...contentProps}
    >
      {#snippet child({ wrapperProps, props, open })}
        {#if open}
          <div {...wrapperProps}>
            <div {...props} transition:fly={{ duration: 200 }}>
              {#each content.groups as group, i (group.heading + i)}
                <ContextMenu.Group>
                  <ContextMenu.GroupHeading
                    class="font-poppins pt-2 pb-1 text-left text-base font-normal text-gray-800"
                  >
                    {group.heading}
                  </ContextMenu.GroupHeading>
                  {#each group.items as item}
                    <ContextMenu.Item
                      class="font-nunito px-0.5 py-1 text-left text-base text-gray-800"
                      textValue={item.text}
                    >
                      {item.text}
                    </ContextMenu.Item>
                  {/each}
                </ContextMenu.Group>
                {#if i < content.groups.length - 1}
                  <ContextMenu.Separator
                    class="-mx-1 my-1 block h-px bg-gray-200"
                  />
                {/if}
              {/each}
            </div>
          </div>
        {/if}
      {/snippet}
    </ContextMenu.Content>
  </ContextMenu.Portal>
</ContextMenu.Root>
