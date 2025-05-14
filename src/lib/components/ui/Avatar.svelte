<script lang="ts">
  import type { SelectUser } from '$lib/server/db/schema';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  import User from 'phosphor-svelte/lib/User';

  let {
    userRole,
    ...restProps
  }: {
    userRole: SelectUser['role'];
  } & HTMLAnchorAttributes = $props();
</script>

<a
  class={[
    'avatar mr-1 ml-2 flex max-h-9 min-h-9 max-w-9 min-w-9 shrink-0 items-center justify-center overflow-hidden rounded-full text-center align-middle outline-2 outline-offset-2 transition-all duration-100 hover:cursor-pointer active:scale-[0.98]',
    userRole === 'admin'
      ? 'bg-yellow-500/10 text-yellow-900 outline-yellow-500/50 hover:outline-yellow-500 focus-visible:outline-yellow-600 active:bg-yellow-600 active:text-white active:outline-yellow-600'
      : '',
    userRole === 'tutor'
      ? 'bg-red-900/10 text-red-950 outline-red-900/50 hover:outline-red-700 focus-visible:outline-red-800 active:bg-red-800 active:text-white active:outline-red-800'
      : '',
    userRole === 'student'
      ? 'bg-blue-900/10 text-blue-900 outline-blue-800/50 hover:outline-blue-800 focus-visible:outline-blue-900 active:bg-blue-900 active:text-white active:outline-blue-900'
      : '',
  ]}
  {...restProps}
>
  <User class="size-7" weight="regular" />
</a>
