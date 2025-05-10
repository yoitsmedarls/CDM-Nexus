<script lang="ts">
  import { Dialog, type WithoutChild } from 'bits-ui';

  import { fly } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';

  import HamburgerMenuTrigger from './HamburgerMenuTrigger.svelte';
  import HamburgerMenuBackdrop from './HamburgerMenuBackdrop.svelte';
  import HamburgerMenuHeader from './HamburgerMenuHeader.svelte';

  type Props = Dialog.RootProps & {
    title: string;
    description: string;
    triggerDuration?: number;
    menuDuration?: number;
    contentProps?: WithoutChild<Dialog.ContentProps>;
  };

  let {
    open = $bindable(false),
    title,
    description,
    triggerDuration = 100,
    menuDuration = 100,
    contentProps,
    children,
    ...restProps
  }: Props = $props();
</script>

<Dialog.Root bind:open {...restProps}>
  <HamburgerMenuTrigger duration={triggerDuration} />
  <Dialog.Portal>
    <HamburgerMenuBackdrop duration={menuDuration} />
    <Dialog.Content
      class="fixed bottom-0 left-[50%] z-100 flex h-auto max-h-3/4 min-h-1/2 w-[calc(100%-1rem)] max-w-lg translate-x-[-50%] flex-col justify-between rounded-t-lg bg-white outline-hidden drop-shadow-md"
      forceMount
      {...contentProps}
    >
      {#snippet child({ props, open })}
        {#if open}
          <div
            {...props}
            transition:fly={{
              y: 100,
              duration: menuDuration,
              easing: cubicInOut,
            }}
          >
            <HamburgerMenuHeader {title} {description} />
            {@render children?.()}
          </div>
        {/if}
      {/snippet}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
