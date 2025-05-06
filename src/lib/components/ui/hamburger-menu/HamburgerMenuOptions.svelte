<script lang="ts">
  import { goto } from '$app/navigation';
  import { Dialog, Separator } from 'bits-ui';

  let {
    options,
  }: {
    options: {
      text: string;
      slug: string;
    }[];
  } = $props();
</script>

<div class="flex h-full grow flex-col overflow-y-auto px-2 py-2 pb-4">
  {#each options as option, i (option.slug)}
    <Dialog.Close>
      <a
        href={option.slug}
        class="font-poppins flex max-h-fit min-h-fit w-full min-w-fit flex-row justify-start overflow-clip rounded-md border-0 bg-transparent p-2 text-center align-middle font-normal text-balance text-gray-800 outline-transparent transition-colors duration-100 hover:cursor-pointer not-disabled:hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300/50 active:scale-[0.99] not-disabled:active:bg-blue-100 not-disabled:active:text-blue-950 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {option.text}
      </a>
    </Dialog.Close>
    {#if i < options.length - 1}
      <Separator.Root class="my-1 h-[0.5px] w-full bg-black/5" />
    {/if}
  {/each}
</div>
