<script lang="ts">
  import { goto } from '$app/navigation';

  let {
    options,
  }: {
    options: {
      text: string;
      slug: string;
    }[];
  } = $props();
</script>

<div class="flex grow flex-col justify-start">
  {#each options as option (option.slug)}
    <button
      popovertarget="hamburger-menu"
      popovertargetaction="hide"
      onclick={() => {
        goto(`/${option.slug}`);
      }}
      class="font-poppins rounded-md p-2 text-left text-base font-medium text-gray-800 transition-all duration-100 hover:bg-gray-50 active:bg-blue-50 active:text-blue-950"
    >
      {option.text}
    </button>
  {/each}
</div>
