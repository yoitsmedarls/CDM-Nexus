<script lang="ts">
  import { AlertDialog, type WithoutChild } from 'bits-ui';
  import { cubicInOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';

  type Props = AlertDialog.RootProps & {
    variant?: 'default' | 'constructive' | 'destructive' | undefined;
    duration?: number;
    buttonText: string;
    title: string;
    description: string;
    action: string;
    contentProps?: WithoutChild<AlertDialog.ContentProps>;
  };

  let {
    open = $bindable(false),
    children,
    variant = 'default',
    duration = 100,
    buttonText,
    contentProps,
    title,
    description,
    action,
    ...restProps
  }: Props = $props();

  let mainButtonStyles = [
    // Base styles
    'font-poppins inline-flex items-center justify-center min-h-fit min-w-fit rounded-md border-0 px-3 py-2 text-center font-medium text-base text-balance text-white outline-transparent select-none transition-colors duration-100 hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]',

    // Variant styles
    variant === 'default'
      ? 'active:bg-blue-max bg-blue-900 focus-visible:outline-blue-950/50  hover:bg-blue-950'
      : '',
    variant === 'constructive'
      ? 'bg-green-700 focus-visible:outline-green-800/50 hover:bg-green-800 active:bg-green-900'
      : '',
    variant === 'destructive'
      ? 'bg-red-600 focus-visible:outline-red-800/50 hover:bg-red-700 active:bg-red-800'
      : '',
  ];
</script>

<AlertDialog.Root bind:open {...restProps}>
  <AlertDialog.Trigger class={[mainButtonStyles, 'drop-shadow-xs']}>
    {buttonText}
  </AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Overlay class="fixed inset-0 z-100 bg-black/75" forceMount>
      {#snippet child({ props })}
        {#if open}
          <div
            {...props}
            transition:fade={{
              duration: duration,
              easing: cubicInOut,
            }}
          ></div>
        {/if}
      {/snippet}
    </AlertDialog.Overlay>
    <AlertDialog.Content
      interactOutsideBehavior="close"
      forceMount
      class="fixed top-[50%] left-[50%] z-100 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 overflow-clip rounded-xl bg-white px-4 pt-6 pb-4 outline-hidden drop-shadow-md sm:max-w-xl"
      {...contentProps}
    >
      {#snippet child({ props })}
        {#if open}
          <div
            {...props}
            transition:fade={{
              duration: duration * 2,
              easing: cubicInOut,
            }}
          >
            <div class="flex flex-col gap-3">
              <AlertDialog.Title
                class="font-poppins text-xl font-semibold text-gray-800"
              >
                {title}
              </AlertDialog.Title>
              <AlertDialog.Description
                class="font-nunito text-base font-normal text-gray-800"
              >
                {description}
              </AlertDialog.Description>
            </div>
            {@render children?.()}
            <form
              method="post"
              {action}
              onsubmit={() => {
                open = false;
              }}
              class="grid w-full grid-cols-2 gap-2"
            >
              <AlertDialog.Cancel
                type="button"
                class="font-poppins inline-flex min-h-fit min-w-fit items-center justify-center rounded-md border-0 bg-gray-100 px-3 py-2 text-center text-base text-balance whitespace-nowrap text-gray-800 outline-transparent transition-colors duration-100 select-none hover:cursor-pointer hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500/50 active:scale-[0.98] active:bg-gray-300"
              >
                Cancel
              </AlertDialog.Cancel>
              <AlertDialog.Action type="submit" class={mainButtonStyles}>
                Confirm
              </AlertDialog.Action>
            </form>
          </div>
        {/if}
      {/snippet}
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>
