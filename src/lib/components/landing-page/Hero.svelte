<script lang="ts">
  import Header from './Header.svelte';
  import Wrapper from './Wrapper.svelte';
</script>

<Wrapper limitmaxheight heightsvh>
  <Header />
  <div
    class="xs:px-2 flex grow flex-col justify-start pb-4 transition-all duration-200"
  >
    <div class="flex w-full grow flex-row justify-center gap-4">
      <div
        class="left-image bg-cdm-yellow-500 w xs:block hidden h-[40svh] max-h-[36em] min-h-[18em] max-w-[12em] min-w-[4em] grow self-start rounded-b-full bg-cover bg-center p-4 drop-shadow-xs"
      ></div>
      <div
        class="main-image bg-cdm-blue-900 grow-7 rounded-md bg-cover bg-center p-4 drop-shadow-xs"
      ></div>
      <div
        class="right-image bg-cdm-red-600 xs:block hidden h-[40svh] max-h-[36em] min-h-[18em] max-w-[12em] min-w-[4em] grow self-end rounded-t-full bg-cover bg-center p-4 drop-shadow-xs"
      ></div>
    </div>
    <div class="relative">
      <div
        class="xs:left-0 xs:bg-transparent xs:px-0 absolute right-[1em] bottom-[1em] left-[1em] z-10 flex flex-col overflow-clip rounded-xl bg-white px-4 py-4 transition-all duration-200"
      >
        <div class="flex flex-col gap-4 pb-6">
          <h1
            class="font-poppins 2xs:text-3xl text-2xl leading-tight font-bold transition-all duration-100 sm:text-4xl lg:text-5xl"
          >
            <span class="bg-white whitespace-break-spaces text-gray-800">
              Mathematics, <br />Made Easy.&nbsp;
            </span>
          </h1>
          <p
            class="font-nunito font-semi 2xs:text-lg text-base leading-tight transition-all duration-100 sm:text-xl lg:text-2xl"
          >
            <span class="bg-white whitespace-break-spaces text-gray-800">
              Learn The Essentials <br />From
              <strong class="text-cdm-blue-950">Students</strong> Like You!&nbsp;
            </span>
          </p>
        </div>
        <a
          href="/courses"
          class="max-h-fit max-w-fit rounded-lg bg-white py-1.5 pr-1.5"
        >
          <span
            class="font-poppins border-cdm-blue-900 text-cdm-blue-900 hover:bg-cdm-blue-900 active:bg-cdm-blue-950 active:border-cdm-blue-950 2xs:text-lg block overflow-clip rounded-md border-2 bg-white px-4 py-2 text-base font-semibold transition-all duration-200 hover:text-white sm:text-xl lg:px-6 lg:py-3 lg:text-2xl"
          >
            Start Now
          </span>
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
