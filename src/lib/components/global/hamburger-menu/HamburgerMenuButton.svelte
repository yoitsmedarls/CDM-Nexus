<script lang="ts">
  import { cubicIn } from 'svelte/easing';
  import { fade } from 'svelte/transition';

  let {
    transitionDuration,
  }: {
    transitionDuration: number;
  } = $props();
</script>

<button
  popovertarget="hamburger-menu"
  popovertargetaction="show"
  in:fade={{
    duration: transitionDuration,
    easing: cubicIn,
  }}
  class="flex h-fit content-center justify-center overflow-clip rounded-sm transition-all duration-100 select-none hover:bg-gray-100 active:bg-blue-50"
>
  <span class="material-symbols-rounded">
    <span
      class="text-3xl leading-none text-gray-800 transition-all duration-100 active:text-blue-950"
    >
      menu
    </span>
  </span>
</button>
