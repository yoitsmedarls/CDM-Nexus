<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade } from 'svelte/transition';
  import type { ActionData } from './$types';
  import { elasticInOut } from 'svelte/easing';

  let { form }: { form: ActionData } = $props();
</script>

<div
  class="flex w-full grow flex-col justify-center md:items-center md:bg-slate-100"
>
  <section
    class="grid h-fit w-full grid-cols-1 gap-5 bg-white px-10 py-12 md:max-w-3xl md:rounded-2xl md:drop-shadow-xl"
  >
    <h1
      class="font-poppins w-full py-4 text-2xl font-semibold overflow-ellipsis"
    >
      Login/Register
    </h1>
    <form class="grid gap-5" method="post" action="?/login" use:enhance>
      <label class="block">
        <span class="font-poppins">Username</span>
        <input
          type="text"
          name="username"
          class="mt-1 block w-full rounded-sm outline-0 transition duration-100
        ease-in-out focus:border-blue-500"
          required
        />
      </label>
      <label class="block">
        <span class="font-poppins">Password</span>
        <input
          type="password"
          name="password"
          class="mt-1 block w-full rounded-sm outline-0 transition duration-100
          ease-in-out focus:border-blue-500"
          required
        />
      </label>
      <div class="flex flex-col justify-center gap-2">
        <button
          class="font-poppins min-w-1/2 rounded-sm bg-blue-100 py-3 transition duration-100 ease-in-out hover:bg-blue-200 active:bg-blue-300"
        >
          Login
        </button>
        <button
          class="font-poppins min-w-1/2 rounded-sm bg-blue-100 py-3 transition duration-100 ease-in-out hover:bg-blue-200 active:bg-blue-300"
          formaction="?/register"
        >
          Register
        </button>
      </div>
    </form>
    {#if form?.message}
      <p transition:fade={{ duration: 100 }} class="text-red-500">
        {form?.message ?? ''}
      </p>
    {/if}
  </section>
  <div class="max-md:grow"></div>
</div>
