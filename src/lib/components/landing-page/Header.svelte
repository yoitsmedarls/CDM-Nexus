<script lang="ts">
  import { fade } from 'svelte/transition';

  let navigationOptions = $state([
    {
      text: 'Courses',
      slug: '#courses',
    },
    {
      text: 'Tutors',
      slug: '#tutors',
    },
    {
      text: 'About',
      slug: '#about',
    },
  ]);

  let vw: number = $state(0);
  let inDuration: number = $state(200);
</script>

<svelte:window bind:innerWidth={vw} />

<header class="relative z-20 flex min-h-fit w-full flex-col">
  <div
    class="xs:px-2 flex min-h-20 w-full flex-row items-center justify-between transition-all duration-200 lg:min-h-24"
  >
    <a href="/" class="focus-visible:outline-0">
      <h1
        class="font-poppins 2xs:text-[1.375rem] w-fit text-xl font-semibold text-gray-800 transition-all duration-100 sm:text-2xl lg:text-3xl"
      >
        <span
          class="from-cdm-blue-900/100 via-cdm-yellow-500/80 to-cdm-red-600/100 bg-linear-100 from-20% via-55% to-90% bg-clip-text font-extrabold text-[#00000010]"
        >
          CDM
        </span>
        Nexus
      </h1>
    </a>
    {#if vw < 768}
      <button
        in:fade={{ duration: inDuration }}
        class="grid place-items-center"
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
        class="flex flex-row items-center gap-4"
      >
        {#each navigationOptions as option (option.slug)}
          <a
            href="/{option.slug}"
            class="font-poppins active:text-cdm-blue-950 hover:text-cdm-blue-900 p-2 text-sm font-semibold text-gray-800 transition-all duration-100 lg:text-base"
          >
            {option.text}
          </a>
        {/each}
        <span class="flex h-6 flex-row justify-center px-0.5">
          <span class="border-r-1 border-[#06266550]"></span>
        </span>
        <a
          href="/login"
          class="font-poppins active:text-cdm-blue-950 hover:text-cdm-blue-900 p-2 text-sm font-semibold text-gray-800 transition-all duration-100 lg:text-base"
        >
          Login
        </a>
        <a
          href="/signup"
          class="font-poppins border-cdm-blue-900 text-cdm-blue-900 hover:bg-cdm-blue-900 active:bg-cdm-blue-950 active:border-cdm-blue-950 rounded-md border-2 bg-white px-4 py-2 text-sm font-semibold transition-all duration-100 hover:text-white active:text-white lg:text-base"
        >
          Sign up
        </a>
      </nav>
    {/if}
  </div>
</header>

<style>
  .material-symbols-rounded {
    font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24;
  }
</style>
