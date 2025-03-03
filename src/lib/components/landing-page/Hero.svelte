<script lang="ts">
  import { fade } from 'svelte/transition';
  import Header from './Header.svelte';
  import Wrapper from './Wrapper.svelte';
</script>

<Wrapper>
  <Header />
  <div class="flex grow flex-col justify-start pb-8">
    <div class="top-0 z-0 flex w-full grow flex-row justify-center gap-4 px-4">
      <div
        in:fade
        class="left-image bg-cdm-yellow-500 hidden h-[40svh] max-h-[24em] min-h-[18em] max-w-[10em] min-w-[4em] grow self-start rounded-t-md rounded-b-full bg-cover bg-center p-4 align-bottom drop-shadow-xs min-[32em]:block"
      ></div>
      <div
        class="main-image bg-cdm-blue-900 grow-8 rounded-md bg-cover bg-center p-4 drop-shadow-xs transition-all duration-200"
      ></div>
      <div
        class="right-image bg-cdm-red-600 hidden h-[40svh] max-h-[24em] min-h-[18em] max-w-[10em] min-w-[4em] grow self-end rounded-t-full rounded-br bg-cover bg-center p-4 drop-shadow-xs min-[32em]:block"
      ></div>
    </div>
    <div class="relative">
      <div
        class="absolute right-[2em] bottom-[1em] left-[2em] z-10 flex min-w-[80%] flex-col overflow-clip rounded-xl bg-[#ffffff] p-4 transition-all duration-200 min-[32em]:left-0 min-[32em]:bg-transparent"
      >
        <div class="flex max-w-fit flex-col gap-4 pb-6">
          <h1
            class="font-poppins letter max-w-[20em] text-3xl leading-tight font-bold transition-all duration-100 sm:text-4xl lg:text-5xl"
          >
            <span
              class="whitespace-break-spaces text-gray-800 transition-all duration-100 min-[32em]:bg-white"
            >
              Mathematics, Made Easy.&nbsp;
            </span>
          </h1>
          <p
            class="font-nunito letter font-semi max-w-[12.5em] text-lg leading-tight transition-all duration-100 min-[32em]:max-w-[50%] sm:text-xl lg:text-2xl"
          >
            <span
              class="whitespace-break-spaces text-gray-800 transition-all duration-100 min-[32em]:bg-white"
            >
              Learn The Essentials From Students Like You!&nbsp;
            </span>
          </p>
        </div>
        <a
          href="/courses"
          class="max-h-fit max-w-fit rounded-lg sm:bg-white sm:p-1.5"
        >
          <span
            class="font-poppins border-cdm-blue-900 text-cdm-blue-900 hover:bg-cdm-blue-900 active:bg-cdm-blue-950 active:border-cdm-blue-950 block rounded-md border-2 bg-white px-4 py-2 text-lg font-semibold transition-all duration-100 hover:text-white sm:text-xl lg:text-2xl"
            >Start Now</span
          >
        </a>
      </div>
    </div>
  </div>
</Wrapper>

<style lang="postcss">
  .left-image {
    background-image: url(https://picsum.photos/seed/c/1440/?blur=8);
  }
  .main-image {
    background-image: url(https://picsum.photos/seed/d/1440/);
  }
  .right-image {
    background-image: url(https://picsum.photos/seed/m/1440/?blur=8);
  }
</style>
