<script lang="ts">
  import ArrowUp from 'phosphor-svelte/lib/ArrowUp';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { fade } from 'svelte/transition';

  let {
    duration = 100,
    ...restProps
  }: {
    duration?: number;
  } & HTMLButtonAttributes = $props();
</script>

<button
  transition:fade={{ duration: duration }}
  class="font-poppins fixed right-4 bottom-6 z-100 inline-flex max-h-fit min-h-fit max-w-fit min-w-fit flex-col justify-center overflow-clip rounded-full border-0 bg-white p-2 text-center align-middle font-medium text-gray-800 outline-transparent drop-shadow-xl transition-colors duration-100 hover:cursor-pointer not-disabled:hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800/50 active:scale-[0.98] not-disabled:active:bg-blue-100 not-disabled:active:text-blue-950 disabled:cursor-not-allowed disabled:opacity-50"
  {...restProps}
>
  <ArrowUp class="size-6" weight="bold" />
</button>
