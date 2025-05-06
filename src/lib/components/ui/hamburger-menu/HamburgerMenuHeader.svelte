<script lang="ts">
  import { Dialog } from 'bits-ui';
  import X from 'phosphor-svelte/lib/X';

  let {
    title = 'Menu',
    description = 'Select an option',
  }: {
    title?: string | undefined;
    description?: string | undefined;
  } = $props();
</script>

<div
  class="flex w-full flex-col justify-start border-b-1 border-gray-100 px-2 pt-4 pb-1"
>
  <div class="flex w-full flex-row items-center justify-between align-middle">
    <Dialog.Title class="font-poppins pl-1 text-xl font-medium text-gray-800">
      {title}
    </Dialog.Title>
    <Dialog.Close
      class="font-poppins inline-flex max-h-fit min-h-fit max-w-fit min-w-fit flex-row justify-start gap-3 overflow-clip rounded-md border-0 bg-white p-1 text-center align-middle font-medium text-balance text-gray-800 outline-transparent transition-colors duration-100 hover:cursor-pointer not-disabled:hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400/50 active:scale-[0.98] not-disabled:active:bg-red-200 not-disabled:active:text-red-950 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <X class="size-6" />
    </Dialog.Close>
  </div>
  <div class="flex w-full flex-row items-center justify-start align-middle">
    <Dialog.Description class="font-nunito text-2xs pl-1 text-gray-800/50">
      {description}
    </Dialog.Description>
  </div>
</div>
