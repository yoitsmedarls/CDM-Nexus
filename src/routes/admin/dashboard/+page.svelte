<script lang="ts">
  import Dashboard from '$lib/components/admin/dashboard/Dashboard.svelte';
  import SidePanel from '$lib/components/admin/dashboard/SidePanel.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let user = $derived(data.user);
  let infoBoxes = $derived([
    {
      info: data.coursesCount.toString(),
      label: data.coursesCount > 1 ? 'Courses' : 'Course',
      description: 'Published & Unpublished',
    },
    {
      info: data.tutorsCount.toString(),
      label: data.tutorsCount > 1 ? 'Tutors' : 'Tutor',
      description: 'Active & Inactive',
    },
    {
      info: data.studentsCount.toString(),
      label: data.studentsCount > 1 ? 'Students' : 'Student',
      description: 'With An Account',
    },
    {
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

<Dashboard user={data.user} {infoBoxes}></Dashboard>
<SidePanel></SidePanel>
