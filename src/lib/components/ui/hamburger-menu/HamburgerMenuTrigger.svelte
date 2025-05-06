<script lang="ts">
  import { Dialog } from 'bits-ui';
  import List from 'phosphor-svelte/lib/List';

  import { cubicInOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';

  let {
    duration = 100,
  }: {
    duration?: number;
  } = $props();
</script>

<div
  in:fade={{
    duration: duration,
    easing: cubicInOut,
  }}
>
  <Dialog.Trigger
    class="font-poppins inline-flex max-h-fit min-h-fit max-w-fit min-w-fit flex-row justify-start gap-3 overflow-clip rounded-md border-0 bg-none p-1 text-center align-middle font-medium text-balance text-gray-800 outline-transparent transition-colors duration-100 hover:cursor-pointer not-disabled:hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400/50 active:scale-[0.98] not-disabled:active:bg-gray-200 not-disabled:active:text-black disabled:cursor-not-allowed disabled:opacity-50"
  >
    <List class="size-6" />
  </Dialog.Trigger>
</div>
