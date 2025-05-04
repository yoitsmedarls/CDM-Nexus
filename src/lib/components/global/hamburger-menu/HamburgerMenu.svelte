<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    text,
    children,
  }: {
    text: string;
    children: Snippet;
  } = $props();
</script>

<div
  popover
  id="hamburger-menu"
  class="mx-4 mt-auto max-h-1/2 min-h-2/5 w-auto overflow-clip rounded-t-md p-4 drop-shadow-md backdrop:bg-black/50 open:flex open:flex-col"
>
  <div class="mb-2 min-h-fit w-full border-b-1 border-gray-100 pb-1">
    <h2
      class="font-poppins px-1 text-xl leading-loose font-semibold text-gray-800"
    >
      {text}
    </h2>
  </div>
  <div class="flex grow flex-col justify-between overflow-auto rounded-sm">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
