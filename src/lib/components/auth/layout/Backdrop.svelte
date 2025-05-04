<script lang="ts">
  import { fade } from 'svelte/transition';

  let {
    transitionDuration,
  }: {
    transitionDuration: number;
  } = $props();
</script>

<div
  in:fade={{
    duration: transitionDuration,
  }}
  class="bg-image fixed flex h-full w-full grow flex-col bg-cover bg-scroll bg-center bg-no-repeat brightness-50 transition-all duration-100"
></div>

<style>
  .bg-image {
    background-image: url(https://picsum.photos/seed/cdm/1920/1080?blur=4);
  }
</style>
