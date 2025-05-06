<script lang="ts">
  import { Button, type WithoutChildrenOrChild } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  let {
    class: additionalStyles,
    variant = 'outline',
    children,
    icon,
    ...restProps
  }: WithoutChildrenOrChild<Button.RootProps> & {
    class?: {
      button?: ClassValue | undefined;
      span?: ClassValue | undefined;
    };
    variant?:
      | 'primary'
      | 'secondary'
      | 'outline'
      | 'destructive'
      | 'ghost'
      | 'underline'
      | undefined;
    icon?: Snippet | undefined;
    children?: Snippet;
  } = $props();
</script>

<Button.Root
  class={[
    // Base styles
    'inline-flex',
    'flex-row',
    'justify-start',
    'gap-3',
    'min-h-fit',
    'min-w-fit',
    'font-poppins',
    'font-medium',
    'text-center',
    'align-middle',
    'text-balance',
    'overflow-clip',
    'transition-colors',
    'duration-100',
    'hover:cursor-pointer',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',

    // Limit the width if the button is icon only
    icon && !children
      ? ['max-h-fit', 'max-w-fit', 'p-1']
      : variant !== 'underline'
        ? ['py-2', 'px-3', 'whitespace-nowrap']
        : '',

    variant !== 'underline' ? 'drop-shadow-xs' : '',

    // Specific styles for certain button types
    ['primary', 'destructive'].includes(variant)
      ? 'text-white'
      : 'text-gray-800',
    ['underline'].includes(variant) ? 'rounded-none' : 'rounded-md',
    ['outline'].includes(variant) ? 'border-1 border-gray-100' : 'border-0',
    ['underline'].includes(variant)
      ? ['outline-0', 'focus-within:*:last:underline', 'focus-within:outline-0']
      : [
          'outline-transparent',
          'focus-visible:outline-2',
          'focus-visible:outline-offset-2',
          'active:scale-[0.99]',
        ],
    !['primary', 'destructive', 'underline'].includes(variant)
      ? 'focus-within:outline-gray-400/50'
      : '',
    variant === 'primary' ? 'focus-within:outline-blue-900/50' : '',
    variant === 'destructive' ? 'focus-within:outline-red-800/50' : '',

    // Background styles
    ['ghost', 'underline'].includes(variant) ? 'bg-none' : '',
    variant === 'primary' ? 'bg-blue-800' : '',
    variant === 'secondary' ? 'bg-gray-100' : '',
    ['outline'].includes(variant) ? 'bg-white' : '',
    variant === 'destructive' ? 'bg-red-600' : '',

    // Hover styles
    variant === 'primary' ? 'not-disabled:hover:bg-blue-900' : '',
    variant === 'secondary' ? 'not-disabled:hover:bg-gray-200' : '',
    ['outline'].includes(variant) ? 'not-disabled:hover:border-gray-200' : '',
    variant === 'destructive' ? 'not-disabled:hover:bg-red-700' : '',
    variant === 'ghost' ? 'not-disabled:hover:bg-white' : '',
    variant === 'underline'
      ? 'not-disabled:hover:text-blue-800 not-disabled:hover:*:last:underline'
      : '',

    // Active styles
    variant === 'primary' ? 'not-disabled:active:bg-blue-950' : '',
    variant === 'secondary' ? 'not-disabled:active:bg-gray-300' : '',
    ['outline'].includes(variant)
      ? [
          'not-disabled:active:border-gray-300',
          'not-disabled:active:bg-gray-100',
        ]
      : '',
    variant === 'destructive' ? 'not-disabled:active:bg-red-800' : '',
    variant === 'ghost' ? 'not-disabled:active:bg-gray-100' : '',
    variant === 'underline' ? 'not-disabled:active:text-blue-900' : '',

    // Underline specific style
    variant === 'underline' ? 'underline-offset-3' : '',

    // Additional styles
    additionalStyles?.button,
  ]}
  {...restProps}
>
  {#if icon}
    <span class="inline-flex grow flex-row items-center justify-center">
      {@render icon()}
    </span>
  {/if}
  {#if children}
    <span
      class={[
        'flex w-full grow flex-col justify-center',
        additionalStyles?.span,
      ]}
    >
      {@render children()}
    </span>
  {/if}
</Button.Root>
