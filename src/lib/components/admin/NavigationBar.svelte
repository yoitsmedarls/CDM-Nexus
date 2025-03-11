<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade } from 'svelte/transition';

  let {
    viewportWidth,
    inDuration,
    navigationOptions,
  }: {
    viewportWidth: number;
    inDuration: number;
    navigationOptions: { text: string; slug: string }[];
  } = $props();
</script>

<header
  class="xl:bg-cdm-blue-950 sticky top-0 flex w-full overflow-clip border-white bg-white px-4 transition-all duration-200 xl:bottom-0 xl:left-0 xl:max-h-svh xl:max-w-fit xl:min-w-fit xl:rounded-[0.875rem] xl:border-8 xl:py-4"
>
  <div
    class="flex min-h-20 w-full flex-row items-center transition-all duration-200 max-xl:justify-between lg:min-h-24 xl:flex-col xl:gap-4"
  >
    <a href="dashboard">
      <h1
        class="font-poppins 2xs:text-[1.375rem] w-fit text-xl font-semibold text-gray-800 transition-all duration-100 sm:text-2xl lg:text-3xl xl:py-4 xl:pr-8 xl:pl-2 xl:text-white"
      >
        {viewportWidth < 1280 ? 'Dashboard' : 'CDM Nexus'}
      </h1>
      <hr class="hidden text-white xl:block" />
    </a>
    {#if viewportWidth < 768}
      <button
        in:fade={{ duration: inDuration }}
        class="grid place-items-center md:hidden"
      >
        <span class="material-symbols-rounded">
          <span
            class="text-cdm-blue-950 2xs:text-[1.625rem] px-1 text-2xl transition-all duration-100 sm:text-3xl"
          >
            menu
          </span>
        </span>
      </button>
    {:else}
      <nav
        in:fade={{ duration: inDuration }}
        class="flex flex-row items-center gap-4 xl:h-full xl:w-full xl:flex-col xl:justify-between"
      >
        <div class="xl:flex xl:w-full xl:flex-col">
          {#each navigationOptions as option (option.slug)}
            <a
              href={option.slug}
              class="font-poppins active:text-cdm-blue-950 max-xl:hover:text-cdm-blue-900 xl:hover:text-cdm-blue-950 rounded-md p-2 text-sm font-semibold text-gray-800 transition-all duration-100 lg:text-base xl:block xl:w-full xl:text-gray-50 xl:hover:bg-white xl:active:bg-gray-100"
            >
              {option.text}
            </a>
          {/each}
        </div>
        <span class="flex h-6 flex-row justify-center px-0.5 xl:hidden">
          <span class="border-r-1 border-[#06266550]"></span>
        </span>
        <form class="flex w-full flex-col" method="post" use:enhance>
          <button
            class="font-poppins border-cdm-red-700 text-cdm-red-700 hover:bg-cdm-red-700 active:bg-cdm-red-800 active:border-cdm-red-800 rounded-md border-2 bg-white px-4 py-2 text-sm font-semibold transition-all duration-100 hover:text-white active:text-white lg:text-base xl:w-full xl:text-center"
          >
            Log Out
          </button>
        </form>
      </nav>
    {/if}
  </div>
</header>
