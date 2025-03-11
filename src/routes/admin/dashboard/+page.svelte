<script lang="ts">
  import Body from '$lib/components/admin/Body.svelte';
  import Header from '$lib/components/admin/Header.svelte';
  import InfoBox from '$lib/components/admin/dashboard/main/InfoBox.svelte';
  import CalendarWidget from '$lib/components/admin/dashboard/sidepanel/CalendarWidget.svelte';
  import EventsWidget from '$lib/components/admin/dashboard/sidepanel/EventsWidget.svelte';
  import MainWrapper from '$lib/components/admin/MainWrapper.svelte';
  import SidePanel from '$lib/components/admin/SidePanel.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let charts: { id: string; text: string }[] = $state([]);
  charts.push({ id: 'pie-chart', text: 'Pie Chart' });
  charts.push({ id: 'bar-chart', text: 'Bar Chart' });

  let title = $derived('Welcome, ' + data.user.username + '!');
  let subtitle = $derived(data.user.cdmEmail);
  let infoBoxes = $derived([
    {
      id: 'no-of-courses',
      info: data.coursesCount.toString(),
      label: data.coursesCount > 1 ? 'Courses' : 'Course',
      description: 'Published & Unpublished',
    },
    {
      id: 'no-of-tutors',
      info: data.tutorsCount.toString(),
      label: data.tutorsCount > 1 ? 'Tutors' : 'Tutor',
      description: 'Active & Inactive',
    },
    {
      id: 'no-of-students',
      info: data.studentsCount.toString(),
      label: data.studentsCount > 1 ? 'Students' : 'Student',
      description: 'With An Account',
    },
    {
      id: 'no-of-site-visits',
      info: data.visitsCount.toString(),
      label: data.visitsCount > 1 ? 'Site Visits' : 'Site Visit',
      description: 'Across All Courses',
    },
  ]);
</script>

<svelte:head>
  <title>Dashboard</title>
  <meta name="description" content="Dashboard for CDM Nexus Administrators." />
</svelte:head>

<MainWrapper>
  <Header {title} {subtitle} />
  <Body>
    <section
      class="grid min-h-fit grid-cols-2 gap-2 border-b-1 border-gray-100 p-2 pb-4 lg:grid-cols-4"
    >
      {#each infoBoxes as box (box.id)}
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
      {#each charts as chart (chart.id)}
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
  </Body>
</MainWrapper>
<SidePanel>
  <CalendarWidget />
  <EventsWidget />
</SidePanel>
