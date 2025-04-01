<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade } from 'svelte/transition';
  import type { PageProps } from './$types';

  let { form, data }: PageProps = $props();
</script>

<main
  class="flex w-full grow flex-col justify-center md:items-center md:bg-slate-100"
>
  <section
    class="grid h-fit w-full grid-cols-1 gap-5 bg-white px-10 py-12 md:max-w-3xl md:rounded-2xl md:drop-shadow-xl"
  >
    <h1
      class="font-poppins w-full py-4 text-2xl font-semibold overflow-ellipsis"
    >
      Login
    </h1>
    <form class="grid gap-5" method="post" use:enhance>
      <label class="block">
        <span class="font-poppins">Username</span>
        <input
          type="text"
          name="username"
          class="mt-1 block w-full rounded-sm outline-0 transition duration-100
        ease-in-out focus:border-blue-500"
        />
      </label>
      <label class="block">
        <span class="font-poppins">Password</span>
        <input
          type="password"
          name="password"
          class="mt-1 block w-full rounded-sm outline-0 transition duration-100
          ease-in-out focus:border-blue-500"
        />
      </label>
      <div class="flex flex-col justify-center gap-2">
        <button
          class="font-poppins min-w-1/2 rounded-sm bg-blue-100 py-3 transition duration-100 ease-in-out hover:bg-blue-200 active:bg-blue-300"
        >
          Login
        </button>
      </div>
    </form>
    <a
      href={data.redirectTo ? '/register' + data.redirectTo : '/register'}
      class="font-poppins text-right text-sm text-blue-400 transition duration-100 ease-in-out hover:text-blue-500 active:text-blue-600"
    >
      Don't have an account?
    </a>
    {#if form?.message}
      <p transition:fade={{ duration: 100 }} class="text-red-500">
        {form?.message ?? ''}
      </p>
    {/if}
  </section>
  <div class="max-md:grow"></div>
</main>
