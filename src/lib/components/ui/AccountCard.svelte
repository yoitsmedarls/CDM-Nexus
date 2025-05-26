<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { SelectUser } from '$lib/server/db/schema';

  import { goto } from '$app/navigation';

  import Separator from '$lib/components/ui/Separator.svelte';
  import Avatar from '$lib/components/ui/Avatar.svelte';

  let {
    user,
    ...restProps
  }: {
    user: {
      username: SelectUser['username'];
      cdmEmail: SelectUser['cdmEmail'];
      role: SelectUser['role'];
    };
  } & HTMLButtonAttributes = $props();
</script>

<button
  type="button"
  onclick={() => {
    goto(`/${user.role}/account`);
  }}
  class="flex flex-row gap-1 overflow-clip rounded-md border border-gray-100 bg-white px-1.5 py-1 outline-2 outline-offset-2 outline-transparent drop-shadow-xs transition-all duration-100 hover:drop-shadow-sm focus-visible:outline-gray-800/25 active:scale-[0.99] active:border-gray-200 active:bg-gray-50 active:drop-shadow-xs"
  {...restProps}
>
  <div
    class="flex size-14 shrink-0 flex-col items-center justify-center align-middle"
  >
    <Avatar userRole={user.role} />
  </div>
  <Separator
    class="scale-y-75 bg-yellow-950/25"
    orientation="vertical"
    decorative
  />
  <div class="overflow flex w-full flex-col justify-center px-1">
    <h2
      class="font-poppins flex flex-row text-left text-base leading-normal font-medium overflow-ellipsis text-gray-800"
    >
      {user.username}
    </h2>
    <p
      class="font-nunito flex flex-row pb-1 text-left text-xs leading-none font-light overflow-ellipsis text-gray-800"
    >
      {user.cdmEmail}
    </p>
  </div>
</button>
