<script lang="ts">
  import Dashboard from '$lib/components/admin/dashboard/Dashboard.svelte';
  import SidePanel from '$lib/components/admin/dashboard/SidePanel.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Dashboard</title>
  <meta name="description" content="Dashboard for CDM Nexus Administrators." />
</svelte:head>

<Dashboard user={data.user}></Dashboard>
<SidePanel></SidePanel>
