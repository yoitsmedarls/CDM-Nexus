<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

{#if data.user}
  <h1>Hello, {data.user.username}</h1>
  <p>ID: {data.user.id}</p>

  <form class="flex w-full flex-col" method="post" use:enhance>
    <button
      class="font-poppins border-cdm-red-700 text-cdm-red-700 hover:bg-cdm-red-700 active:bg-cdm-red-800 active:border-cdm-red-800 my-10 w-fit rounded-md border-2 bg-white px-4 py-2 text-sm font-semibold transition-all duration-100 hover:text-white active:text-white"
    >
      Log Out
    </button>
  </form>
{/if}
