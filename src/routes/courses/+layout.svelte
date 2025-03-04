<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<nav
  class="sticky top-0 flex h-auto w-auto flex-nowrap justify-end gap-x-2 bg-slate-200 p-2 align-middle"
>
  <a
    class="flex w-25 flex-row justify-center rounded-md bg-slate-300 px-4 py-4 align-middle hover:bg-slate-400 active:bg-slate-500"
    href="/courses"
  >
    All Courses
  </a>
</nav>

{@render children()}
