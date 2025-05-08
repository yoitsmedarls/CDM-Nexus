<script lang="ts">
  import { Dialog } from 'bits-ui';

  let {
    option,
  }: {
    option: {
      text: string;
      slug: string;
    };
  } = $props();
</script>

<Dialog.Close>
  <a
    href={option.slug}
    class="font-poppins flex max-h-fit min-h-fit w-full min-w-fit flex-row justify-start overflow-clip rounded-md border-0 bg-transparent p-2 text-center align-middle font-normal text-balance text-gray-800 outline-transparent transition-colors duration-100 hover:cursor-pointer not-disabled:hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300/50 active:scale-[0.99] not-disabled:active:bg-blue-100 not-disabled:active:text-blue-950 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {option.text}
  </a>
</Dialog.Close>
