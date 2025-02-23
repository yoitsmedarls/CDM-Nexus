<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();
</script>

<div class="flex h-screen w-full pt-40 md:justify-center md:bg-slate-100">
  <section
    class="grid h-fit w-full grid-cols-1 gap-5 bg-white px-10 py-12 md:max-w-3xl md:rounded-2xl md:drop-shadow-xl"
  >
    <h1 class="w-full py-4 text-2xl font-bold overflow-ellipsis">
      Login/Register
    </h1>
    <form class="grid gap-5" method="post" action="?/login" use:enhance>
      <label class="block">
        <span class="font-semibold">Username</span>
        <input type="text" name="username" class="mt-1 block w-full" />
      </label>
      <label class="block">
        <span class="font-semibold">Password</span>
        <input type="password" name="password" class="mt-1 block w-full" />
      </label>
      <div class="flex flex-col justify-center gap-2">
        <button class="min min-w-1/2 bg-slate-300 py-3 font-semibold">
          Login
        </button>
        <button
          class="min min-w-1/2 bg-slate-300 py-3 font-semibold"
          formaction="?/register"
        >
          Register
        </button>
      </div>
    </form>
    <p style="color: red">{form?.message ?? ''}</p>
  </section>
</div>
