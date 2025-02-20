<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<div class="h-screen xl:flex xl:flex-row">
  <div class="w-ful flex min-h-16 md:min-h-20 xl:h-full xl:w-28 xl:p-4">
    <nav class="flex w-full bg-emerald-200 shadow-xs xl:rounded-xl"></nav>
  </div>

  <header class="hidden max-h-28 w-full p-4 align-bottom xl:flex xl:flex-row">
    <h1 class="my-auto w-fit text-4xl font-bold text-nowrap">Welcome!</h1>
    <div class="flex w-full flex-row justify-end">
      <button class="w-20 rounded-full bg-emerald-100">BTN</button>
    </div>
  </header>
</div>
