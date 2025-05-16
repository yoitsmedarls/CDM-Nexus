<script lang="ts">
  import type { Snippet } from 'svelte';
  import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
  import CaretRight from 'phosphor-svelte/lib/CaretRight';
  import { fade, fly } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import Separator from '$lib/components/ui/Separator.svelte';

  let {
    duration = 100,
    viewportWidth,
    children,
  }: {
    viewportWidth: number;
    duration: number;
    children: Snippet;
  } = $props();

  let open = $state(false);
</script>

{#if open}
  <div
    transition:fade={{ duration: duration, easing: cubicInOut }}
    class="fixed inset-0 z-10 bg-black/25 xl:hidden"
  ></div>
  <aside
    transition:fly={{ duration: duration, easing: cubicInOut, x: 100 }}
    class="2xs:min-w-[16rem] 2xs:max-w-xs max-2xs:left-2 2xs:w-full fixed top-16 right-0 bottom-2 z-20 flex h-[calc(100svh-4.5rem)] flex-col rounded-l-md border-gray-200 bg-white max-xl:drop-shadow-xl md:top-18 md:h-[calc(100svh-5rem)] xl:sticky xl:top-2 xl:right-2 xl:h-[calc(100svh-1rem)] xl:rounded-md xl:border xl:drop-shadow-xs"
  >
    <header class="flex flex-row items-center justify-between p-2 pt-3">
      <h2 class="font-poppins pl-1 text-lg font-medium text-gray-800">
        Widgets
      </h2>
      <button
        onclick={() => (open = false)}
        class="font-poppins inline-flex max-h-fit min-h-fit max-w-fit min-w-fit flex-row justify-start gap-3 overflow-clip rounded-md border-0 bg-white p-1 text-center align-middle font-medium text-balance text-gray-800 outline-transparent transition-colors duration-100 hover:cursor-pointer not-disabled:hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400/50 active:scale-[0.98] not-disabled:active:bg-red-200 not-disabled:active:text-red-950 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <CaretRight class="size-6" />
      </button>
    </header>
    <Separator orientation="horizontal" decorative />
    <div
      class="flex grow flex-col items-center gap-2 overflow-clip rounded-md p-2"
    >
      {@render children()}
    </div>
  </aside>
{:else}
  <button
    in:fade={{ duration: duration }}
    onclick={() => (open = true)}
    class="font-poppins fixed top-1/2 right-0 bottom-1/2 z-10 inline-flex max-h-fit min-h-fit max-w-fit min-w-fit flex-row justify-start gap-3 overflow-clip rounded-l-full border-0 bg-white p-1 text-center align-middle font-medium text-balance text-gray-800 outline-transparent drop-shadow-md transition-colors duration-100 hover:cursor-pointer not-disabled:hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400/50 active:scale-[0.98] not-disabled:active:bg-blue-100 not-disabled:active:text-blue-950 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <CaretLeft class="size-6" />
  </button>
{/if}
