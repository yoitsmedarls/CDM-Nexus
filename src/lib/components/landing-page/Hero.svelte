<script>
  import Header from './Header.svelte';
  import Wrapper from './Wrapper.svelte';
</script>

<Wrapper>
  <Header />
  <div class="flex grow flex-col justify-start pb-8">
    <div
      class="top-0 z-0 flex w-full grow flex-row justify-center gap-4 bg-white p-4"
    >
      <div
        class="bg-cdm-yellow-500 min-h-[24em] max-w-[10em] min-w-fit grow self-start rounded-t-md rounded-b-full bg-[url(https://picsum.photos/seed/c/1440/?blur=5)] bg-cover bg-center p-4"
      ></div>
      <div
        class="bg-cdm-blue-900 min-w-fit grow-6 rounded-md bg-[url(https://picsum.photos/seed/d/1440/)] bg-cover bg-center p-4"
      ></div>
      <div
        class="bg-cdm-red-600 min-h-[24em] max-w-[10em] min-w-fit grow self-end rounded-t-full rounded-br bg-[url(https://picsum.photos/seed/m/1440/?blur=5)] bg-cover bg-center p-4"
      ></div>
    </div>
    <div class="relative">
      <div
        class="absolute bottom-[4em] left-0 z-10 flex max-w-fit flex-col p-4"
      >
        <div class="flex max-w-fit flex-col gap-4 pb-8">
          <h1
            class="font-poppins letter max-w-[75%] text-4xl leading-tight font-bold"
          >
            <span class="bg-white whitespace-break-spaces text-gray-800">
              Mathematics, Made Easy.&nbsp;
            </span>
          </h1>
          <p
            class="font-nunito letter font-semi max-w-[50%] text-xl leading-tight"
          >
            <span class="bg-white whitespace-break-spaces text-gray-800">
              Learn The Essentials From Students Like You!&nbsp;
            </span>
          </p>
        </div>
        <a
          href="/courses"
          class="font-poppins border-cdm-blue-900 text-cdm-blue-900 hover:bg-cdm-blue-900 active:bg-cdm-blue-950 active:border-cdm-blue-950 max-w-fit rounded-md border-2 bg-white px-4 py-2 text-xl font-semibold transition-all duration-100 hover:text-white"
        >
          Start Now
        </a>
      </div>
    </div>
  </div>
</Wrapper>
