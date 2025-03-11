<script lang="ts">
  import type { SelectUser } from '$lib/server/db/schema';
  import InfoBox from './InfoBox.svelte';

  let charts: { id: string; text: string }[] = $state([]);
  charts.push({ id: 'pie-chart', text: 'Pie Chart' });
  charts.push({ id: 'bar-chart', text: 'Bar Chart' });

  let {
    user,
    infoBoxes,
  }: {
    user: { username: string; cdmEmail: string };
    infoBoxes: { info: string; label: string; description: string }[];
  } = $props();
</script>

<main
  class="flex w-full grow flex-col overflow-clip transition-all duration-200"
>
  <hgroup
    class="hgroup-bg-image flex flex-col border-b-1 border-gray-100 bg-cover bg-bottom p-4 transition-all duration-200 md:border-0 md:bg-gray-300 md:pt-12 md:pb-6 xl:rounded-t-md xl:pt-16"
  >
    <h1
      class="font-poppins 2xs:text-[1.375rem] w-fit text-xl font-semibold text-gray-800 transition-all duration-100 sm:text-2xl md:text-gray-50 lg:text-3xl"
    >
      Welcome, {user?.username}!
    </h1>
    <p
      class="font-nunito 2xs:text-[0.875rem] text-[0.75rem] font-semibold text-gray-800 transition-all duration-100 sm:text-base md:text-white lg:text-lg"
    >
      {user?.cdmEmail}
    </p>
  </hgroup>
  <div
    class="flex grow flex-col rounded-b-md border-gray-200 p-2 xl:border-x-1 xl:border-b-1"
  >
    <section
      class="grid min-h-fit grid-cols-2 gap-2 border-b-1 border-gray-100 p-2 pb-4 lg:grid-cols-4"
    >
      {#each infoBoxes as box}
        <InfoBox
          info={box.info}
          label={box.label}
          description={box.description}
        />
      {/each}
    </section>
    <section
      class="flex flex-col gap-2 border-b-1 border-gray-100 px-2 py-4 lg:flex-row xl:justify-center"
    >
      {#each charts as chart}
        <div
          class="flex grow flex-col overflow-clip rounded-md bg-gray-100 p-4 xl:max-w-1/2"
        >
          <h2
            class="font-nunito 2xs:text-[0.875rem] text-[0.75rem] font-semibold text-gray-800 transition-all duration-100 sm:text-base lg:text-lg"
          >
            {chart.text}
          </h2>
          <canvas id={chart.id}></canvas>
        </div>
      {/each}
    </section>
    <section
      class="flex grow flex-col gap-2 border-b-1 border-gray-100 px-2 py-4 lg:flex-row"
    >
      <div class="min-h-1/2 grow pb-10">
        <h2
          class="font-poppins 2xs:text-[0.875rem] pb-2 text-[0.75rem] font-semibold text-gray-800 transition-all duration-100 sm:text-base lg:text-lg"
        >
          Gantt Chart
        </h2>
        <p
          class="font-nunito 2xs:text-[0.875rem] pb-2 text-[0.75rem] font-semibold text-gray-800 transition-all duration-100 sm:text-base lg:text-lg"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo vitae
          eveniet ad doloribus fugit fugiat odit temporibus explicabo facere,
          alias minima quos, accusamus a magnam veritatis culpa eligendi
          asperiores hic.
        </p>
      </div>
    </section>
  </div>
</main>

<style>
  .hgroup-bg-image {
    @media (width >= 48rem) {
      background-image: url(https://picsum.photos/seed/cdm/1440/200/?blur=10);
    }
  }
</style>
