<script lang="ts">
  import type { Snippet } from 'svelte';
  import type {
    HTMLAnchorAttributes,
    HTMLButtonAttributes,
  } from 'svelte/elements';

  import { goto } from '$app/navigation';

  import Icon from '$lib/components/ui/Icon.svelte';

  // Since the component can either be an anchor or button tag,
  // Two similar interfaces are created. Not that elegant but whatever.
  interface Button extends HTMLButtonAttributes {
    variant?:
      | 'primary'
      | 'secondary'
      | 'outline'
      | 'destructive'
      | 'ghost'
      | 'underline'
      | undefined;
    href?: string | undefined;
    type?: 'button' | 'submit' | 'reset' | null | undefined;
    usegoto?: boolean | undefined;
    disabled?: boolean | undefined;
    loading?: boolean | undefined;
    icon?: string | undefined;
    class?: string | undefined;
    children?: Snippet;
  }

  interface Anchor extends HTMLAnchorAttributes {
    variant?:
      | 'primary'
      | 'secondary'
      | 'outline'
      | 'destructive'
      | 'ghost'
      | 'underline'
      | undefined;
    href?: string | undefined;
    type: never;
    usegoto?: never;
    disabled?: never;
    loading?: never;
    icon?: string | undefined;
    class?: string | undefined;
    children?: Snippet;
  }

  // Actual declaration of the component props.
  let {
    // Variant refers to the style of the button/link
    variant = 'outline',

    // If href is provided without usegoto,
    //   component becomes an anchor tag.
    // else, a button using goto handles the navigation
    href,
    usegoto = false,

    // Type and disabled only applies to buttons
    type,
    disabled = false,

    // A separate prop that sets a loading icon with
    // disabled attribute if given true
    loading = false,

    // Custom icon
    icon,
    class: additionalStyles = '',
    children,

    // Rest props
    ...others
  }: Button | Anchor = $props();
</script>

<svelte:element
  this={usegoto ? 'button' : href ? 'a' : 'button'}
  type={href && !usegoto ? undefined : type}
  href={href && !usegoto && !disabled ? href : undefined}
  disabled={(disabled || loading) && !(href && usegoto) ? true : undefined}
  role={href && !usegoto ? 'link' : undefined}
  onclick={usegoto
    ? () => {
        goto(`${href}`);
      }
    : undefined}
  class={[
    // NOTE: these styles are too complicated, look for ways to improve.

    // Base styles
    'inline-flex',
    'flex-row',
    'justify-start',
    'gap-3',
    'py-2',
    'px-3',
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
    icon && !children ? 'max-w-fit' : '',

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
        ],
    !['primary', 'destructive', 'underline'].includes(variant)
      ? 'focus-within:outline-gray-400/50'
      : '',
    variant === 'primary' ? 'focus-within:outline-blue-950/50' : '',
    variant === 'destructive' ? 'focus-within:outline-red-800/50' : '',

    // Background styles
    ['ghost', 'underline'].includes(variant) ? 'bg-none' : '',
    variant === 'primary' ? 'bg-blue-900' : '',
    variant === 'secondary' ? 'bg-gray-100' : '',
    ['outline'].includes(variant) ? 'bg-white' : '',
    variant === 'destructive' ? 'bg-red-600' : '',

    // Hover styles
    variant === 'primary' ? 'not-disabled:hover:bg-blue-950' : '',
    variant === 'secondary' ? 'not-disabled:hover:bg-gray-200' : '',
    ['outline'].includes(variant) ? 'not-disabled:hover:border-gray-200' : '',
    variant === 'destructive' ? 'not-disabled:hover:bg-red-700' : '',
    variant === 'ghost' ? 'not-disabled:hover:bg-white' : '',
    variant === 'underline'
      ? 'not-disabled:hover:text-blue-900 not-disabled:hover:*:last:underline'
      : '',

    // Active styles
    variant === 'primary' ? 'not-disabled:active:bg-blue-1000' : '',
    variant === 'secondary' ? 'not-disabled:active:bg-gray-300' : '',
    ['outline'].includes(variant)
      ? [
          'not-disabled:active:border-gray-300',
          'not-disabled:active:bg-gray-100',
        ]
      : '',
    variant === 'destructive' ? 'not-disabled:active:bg-red-800' : '',
    variant === 'ghost' ? 'not-disabled:active:bg-gray-100' : '',
    variant === 'underline' ? 'not-disabled:active:text-blue-950' : '',

    // Underline specific style
    variant === 'underline' ? 'underline-offset-2' : '',

    // Additional styles
    additionalStyles ? additionalStyles : '',
  ]}
  {...others}
>
  {#if icon || loading}
    <span class="inline-flex grow flex-row items-center justify-center">
      <Icon icon={loading ? 'progress_activity' : icon} />
    </span>
  {/if}
  {#if children}
    <span class="flex w-full grow flex-col justify-center">
      {@render children()}
    </span>
  {/if}
</svelte:element>
