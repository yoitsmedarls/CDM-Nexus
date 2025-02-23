<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<section class="p-4">
  <h1 class="font-poppins py-5 text-4xl font-bold">
    Hi, {data.user.username}!
  </h1>
  <p class="font-nunito pb-4 text-lg">Your user ID is {data.user.id}.</p>
  <form method="post" action="?/logout" use:enhance>
    <button class="font-poppins bg-slate-200 px-5 py-2 text-lg">Sign out</button
    >
  </form>
</section>
