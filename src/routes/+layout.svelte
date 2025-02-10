<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<nav
  class="sticky top-0 flex h-auto w-auto flex-nowrap justify-end gap-x-2 bg-slate-200 p-2 align-middle"
>
  <a
    class="w-25 flex flex-row justify-center rounded-md bg-slate-300 px-4 py-4 align-middle hover:bg-slate-400 active:bg-slate-500"
    href="/"
  >
    Home
  </a>

  <a
    class="w-25 flex flex-row justify-center rounded-md bg-slate-300 px-4 py-4 align-middle hover:bg-slate-400 active:bg-slate-500"
    href="/courses"
  >
    Courses
  </a>
</nav>

{@render children()}
