<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<section class="flex grow flex-col px-4 pt-10 pb-4">
  <h1 class="font-poppins mb-4 text-4xl font-bold">
    Hello there, {data.user.username}!
  </h1>
  <p class="font-nunito mb-4 text-lg">Your user ID is {data.user.id}.</p>
  <div class="grow border-b-2 border-b-blue-50"></div>
  <form
    class="flex flex-row justify-end pt-4"
    method="post"
    action="?/logout"
    use:enhance
  >
    <button
      class="font-poppins px rounded-sm bg-blue-100 p-10 py-4 transition duration-100 ease-in-out hover:bg-blue-200 active:bg-blue-300"
      >Sign out</button
    >
  </form>
</section>
