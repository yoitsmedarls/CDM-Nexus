<script>
  import Header from './Header.svelte';
  import Wrapper from './Wrapper.svelte';
</script>

<Wrapper>
  <Header />
  <div class="flex grow flex-col justify-start pb-20">
    <div
      class="top-0 z-0 flex w-full grow flex-row justify-center gap-4 bg-white p-4"
    >
      <div
        class="min-h-[24em] max-w-[10em] min-w-fit grow self-start rounded-t-md rounded-b-full bg-[url(https://picsum.photos/seed/c/300)] bg-cover bg-center p-4"
      ></div>
      <div
        class="min-w-fit grow-6 rounded-md bg-[url(https://picsum.photos/seed/d/300)] bg-cover bg-center p-4"
      ></div>
      <div
        class="min-h-[24em] max-w-[10em] min-w-fit grow self-end rounded-t-full rounded-br bg-[url(https://picsum.photos/seed/m/300)] bg-cover bg-center p-4"
      ></div>
    </div>
    <div
      class="absolute bottom-[8em] left-[1em] z-10 flex max-w-fit flex-col p-4"
    >
      <div class="flex max-w-fit flex-col gap-2 pb-6">
        <h1
          class="font-poppins letter max-w-[75%] text-4xl leading-snug font-bold"
        >
          <span class="bg-white whitespace-break-spaces text-gray-800">
            Mathematics, Made Easy.
          </span>
        </h1>
        <p
          class="font-nunito letter font-semi max-w-[50%] text-xl leading-snug"
        >
          <span class="bg-white whitespace-break-spaces text-gray-800">
            Learn The Essentials From Students Like You!
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
</Wrapper>
