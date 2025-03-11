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
  class="sticky top-0 flex w-full overflow-auto border-white bg-white transition-all duration-200 max-xl:px-4 xl:bottom-0 xl:left-0 xl:h-svh xl:max-h-[80rem] xl:min-h-fit xl:max-w-fit xl:min-w-fit xl:border-8"
>
  <div
    class="flex min-h-20 w-full flex-row items-center border-gray-200 transition-all duration-200 max-xl:justify-between lg:min-h-24 xl:flex-col xl:gap-4 xl:rounded-md xl:border-1 xl:p-4"
  >
    <a href="/admin/dashboard">
      <h1
        class="font-poppins 2xs:text-[1.375rem] xl:text-cdm-blue-950 w-fit text-xl font-semibold text-gray-800 transition-all duration-100 sm:text-2xl lg:text-3xl xl:py-4 xl:pr-12 xl:pl-2"
      >
        {viewportWidth < 1280 ? 'Dashboard' : 'CDM Nexus'}
      </h1>
      <hr class="hidden text-gray-600 xl:block" />
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
              href={`/admin/${option.slug}`}
              class="font-poppins active:text-cdm-blue-950 max-xl:hover:text-cdm-blue-900 xl:hover:text-cdm-blue-950 xl:active:bg-cdm-blue-100 xl:hover:bg-cdm-blue-50 rounded-md p-2 text-sm font-semibold text-gray-800 transition-all duration-100 lg:text-base xl:block xl:w-full xl:text-gray-800"
            >
              {option.text}
            </a>
          {/each}
        </div>
        <span class="flex h-6 flex-row justify-center px-0.5 xl:hidden">
          <span class="border-r-1 border-[#06266550]"></span>
        </span>
        <form
          class="flex w-full flex-col"
          method="post"
          action="/admin?/logout"
          use:enhance
        >
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
