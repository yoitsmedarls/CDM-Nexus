<script lang="ts">
  import type { SelectUser } from '$lib/server/db/schema';

  import User from 'phosphor-svelte/lib/User';

  let {
    user,
  }: {
    user: {
      id: SelectUser['id'];
      username: SelectUser['username'];
      role: SelectUser['role'];
    };
  } = $props();
</script>

<a
  href={user.role === 'student' ? '/profile' : `/${user.role}`}
  class={[
    'avatar mx-2 flex size-9 items-center justify-center overflow-hidden rounded-full text-center align-middle outline-2 outline-offset-2 transition-all duration-100 hover:cursor-pointer active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50',
    user.role === 'admin'
      ? 'bg-yellow-500/10 text-yellow-900 outline-yellow-500/50 hover:outline-yellow-500 active:bg-yellow-600 active:text-white active:outline-yellow-600'
      : '',
    user.role === 'tutor'
      ? 'bg-red-900/10 text-red-950 outline-red-900/50 hover:outline-red-700 active:bg-red-800 active:text-white active:outline-red-800'
      : '',
    user.role === 'student'
      ? 'bg-blue-900/10 text-blue-900 outline-blue-800/50 hover:outline-blue-800 active:bg-blue-900 active:text-white active:outline-blue-900'
      : '',
  ]}
>
  <User class="size-7" weight="regular" />
</a>
