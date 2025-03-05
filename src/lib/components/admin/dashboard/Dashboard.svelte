<script lang="ts">
  // import { Chart } from 'chart.js';
  // new Chart(document.getElementById('pieChart'), {
  //   type: 'pie',
  //   data: {
  //     labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
  //     datasets: [
  //       {
  //         data: [20, 20, 20, 20, 20],
  //         backgroundColor: [
  //           '#42a5f5',
  //           '#66bb6a',
  //           '#ffa726',
  //           '#ab47bc',
  //           '#ef5350',
  //         ],
  //       },
  //     ],
  //   },
  // });

  // const barCtx = document.getElementById('barChart').getContext('2d');
  // new Chart(barCtx, {
  //   type: 'bar',
  //   data: {
  //     labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
  //     datasets: [
  //       {
  //         label: 'Series 1',
  //         data: [10, 15, 20, 25],
  //         backgroundColor: '#42a5f5',
  //       },
  //       {
  //         label: 'Series 2',
  //         data: [20, 25, 30, 35],
  //         backgroundColor: '#66bb6a',
  //       },
  //     ],
  //   },
  //   options: { responsive: true, scales: { y: { beginAtZero: true } } },
  // });

  let infoBoxes: { text: string }[] = $state([]);
  for (let index = 1; index <= 4; index++) {
    infoBoxes.push({ text: 'Info Box ' + index });
  }

  let charts: { id: string; text: string }[] = $state([]);
  charts.push({ id: 'pie-chart', text: 'Pie Chart' });
  charts.push({ id: 'bar-chart', text: 'Bar Chart' });

  let {
    user,
  }: {
    user: {
      id: string;
      username: string;
    };
  } = $props();
</script>

<main
  class="flex w-full grow flex-col overflow-clip transition-all duration-200"
>
  <hgroup
    class="hgroup-bg-image xs:px-4 flex flex-col border-b-1 border-gray-100 bg-cover bg-bottom px-2 py-4 transition-all duration-200 md:border-0 md:bg-gray-300 md:pt-12 md:pb-6 xl:rounded-t-md xl:pt-16"
  >
    <h1
      class="font-poppins 2xs:text-[1.375rem] w-fit text-xl font-semibold text-gray-800 transition-all duration-100 sm:text-2xl md:text-gray-50 lg:text-3xl"
    >
      Welcome, {user.username}!
    </h1>
    <p
      class="font-nunito 2xs:text-[0.875rem] text-[0.75rem] font-semibold text-gray-800 transition-all duration-100 sm:text-base md:text-white lg:text-lg"
    >
      ID: {user.id}
    </p>
  </hgroup>
  <div
    class="flex grow flex-col rounded-b-md border-gray-200 p-2 xl:border-x-1 xl:border-b-1"
  >
    <section
      class="grid min-h-fit grid-cols-2 gap-2 border-b-1 border-gray-100 p-2 pb-4 lg:grid-cols-4"
    >
      {#each infoBoxes as box}
        <div
          class="flex max-h-48 min-h-20 w-full min-w-20 grow flex-col items-center justify-center overflow-clip rounded-md bg-gray-100 p-2 transition-all duration-100 xl:min-h-28"
        >
          <h2
            class="font-nunito 2xs:text-[0.875rem] text-[0.75rem] font-semibold text-gray-800 transition-all duration-100 sm:text-base lg:text-lg"
          >
            {box.text}
          </h2>
        </div>
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

  /* .main-content {
    flex: 1;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
  }

  .main-content h1 {
    color: #2c3e50;
  }

  .top-section {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .info-box {
    flex: 1;
    height: 100px;
    background-color: #dfeffc;
    border-radius: 5px;
  }

  .charts-section {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }



  canvas {
    max-width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
  }

  .gantt-chart {
    height: 200px;
    background-color: #fff;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    padding: 10px;
  } */
</style>
