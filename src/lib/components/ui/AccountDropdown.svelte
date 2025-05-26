<script lang="ts">
  import type { SelectUser } from '$lib/server/db/schema';

  import {
    DropdownMenu,
    type DropdownMenuContentProps,
    type DropdownMenuRootProps,
    type WithoutChild,
  } from 'bits-ui';

  import { fade } from 'svelte/transition';

  import User from 'phosphor-svelte/lib/User';

  import AccountCard from '$lib/components/ui/AccountCard.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  type Props = DropdownMenuRootProps & {
    user: {
      username: SelectUser['username'];
      cdmEmail: SelectUser['cdmEmail'];
      role: SelectUser['role'];
    };
    duration: number;
    contentProps?: WithoutChild<DropdownMenuContentProps>;
  };

  let {
    open = $bindable(false),
    user,
    duration = 100,
    contentProps,
    ...restProps
  }: Props = $props();
</script>

<DropdownMenu.Root bind:open {...restProps}>
  <DropdownMenu.Trigger
    class={[
      'mr-1 ml-2 flex max-h-9 min-h-9 max-w-9 min-w-9 shrink-0 items-center justify-center overflow-hidden rounded-full text-center align-middle outline-2 outline-offset-2 transition-all duration-100 hover:cursor-pointer active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50',
      user.role === 'admin'
        ? 'bg-yellow-500/10 text-yellow-900 outline-yellow-500/50 hover:outline-yellow-500 focus-visible:outline-yellow-600 active:bg-yellow-600 active:text-white active:outline-yellow-600 data-[state=open]:bg-yellow-600 data-[state=open]:text-white data-[state=open]:outline-yellow-600'
        : '',
      user.role === 'tutor'
        ? 'bg-red-900/10 text-red-950 outline-red-900/50 hover:outline-red-700 focus-visible:outline-red-800 active:bg-red-800 active:text-white active:outline-red-800 data-[state=open]:bg-red-800 data-[state=open]:text-white data-[state=open]:outline-red-800'
        : '',
      user.role === 'student'
        ? 'bg-blue-900/10 text-blue-900 outline-blue-800/50 hover:outline-blue-800 focus-visible:outline-blue-900 active:bg-blue-900 active:text-white active:outline-blue-900 data-[state=open]:bg-blue-900 data-[state=open]:text-white data-[state=open]:outline-blue-900'
        : '',
    ]}
  >
    <User class="size-7" weight="regular" />
  </DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      forceMount
      side="bottom"
      class="mt-4 mr-2 rounded-md border-gray-200 bg-white p-2 drop-shadow-xl focus-visible:outline-none"
      {...contentProps}
    >
      {#snippet child({ wrapperProps, props, open })}
        {#if open}
          <div {...wrapperProps}>
            <div {...props} transition:fade={{ duration: duration }}>
              <form
                method="post"
                action="/admin?/logout"
                class="grid w-full grid-cols-1 gap-2"
              >
                <AccountCard {user} />
                <Button
                  variant="destructive"
                  type="submit"
                  class={{ button: 'w-full', span: 'text-sm' }}
                >
                  Log out
                </Button>
              </form>
            </div>
            <DropdownMenu.Arrow
              class="mt-4.5 text-white"
              width={10}
              height={10}
            />
          </div>
        {/if}
      {/snippet}
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
