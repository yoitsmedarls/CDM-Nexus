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

  let inDuration: number = $state(200);
  let mediumBreakpoint: number = $state(768);
  let viewportWidth: number = $state(0);
</script>

<svelte:window bind:innerWidth={viewportWidth} />

<header class="relative z-20 flex min-h-fit w-full flex-col">
  <div
    class="xs:px-2 flex min-h-20 w-full flex-row items-center justify-between transition-all duration-200 lg:min-h-24"
  >
    <a href="/" class="focus-visible:outline-0" tabindex="-1">
      <h1
        class="font-poppins 2xs:text-[1.375rem] w-fit pl-1 text-xl font-semibold text-gray-800 transition-all duration-100 sm:text-2xl lg:text-3xl"
      >
        <span
          class="bg-linear-100 from-blue-900/100 from-20% via-yellow-500/80 via-55% to-red-600/100 to-90% bg-clip-text font-extrabold text-[#00000010]"
        >
          CDM
        </span>
        Nexus
      </h1>
    </a>
    {#if viewportWidth < mediumBreakpoint}
      <!-- TODO: Implement the functionality of this hamburger menu -->
      <button
        in:fade={{ duration: inDuration }}
        class="grid place-items-center rounded-sm select-none hover:bg-gray-50 active:bg-gray-100"
      >
        <span class="material-symbols-rounded">
          <span
            class="2xs:text-[1.625rem] px-1 text-2xl text-blue-950 transition-all duration-100 sm:text-3xl"
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
            class="font-poppins p-2 text-sm font-semibold text-gray-800 transition-all duration-100 hover:text-blue-900 active:text-blue-950 lg:text-base"
          >
            {option.text}
          </a>
        {/each}
        <span class="flex h-6 flex-row justify-center px-0.5">
          <span class="border-r-1 border-[#06266550]"></span>
        </span>
        <a
          href="/login"
          class="font-poppins p-2 text-sm font-semibold text-gray-800 transition-all duration-100 hover:text-blue-900 active:text-blue-950 lg:text-base"
        >
          Login
        </a>
        <a
          href="/signup"
          class="font-poppins rounded-md border-2 border-blue-900 bg-white px-4 py-2 text-sm font-semibold text-blue-900 transition-all duration-100 hover:bg-blue-900 hover:text-white active:border-blue-950 active:bg-blue-950 active:text-white lg:text-base"
        >
          Sign up
        </a>
      </nav>
    {/if}
  </div>
</header>
