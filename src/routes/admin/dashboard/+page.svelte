<script lang="ts">
  import Dashboard from '$lib/components/admin/dashboard/Dashboard.svelte';
  import NavigationBar from '$lib/components/admin/dashboard/NavigationBar.svelte';
  import SidePanel from '$lib/components/admin/dashboard/SidePanel.svelte';
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Dashboard</title>
  <meta name="description" content="Dashboard for CDM Nexus administrators." />
</svelte:head>

<div class="flex grow flex-col justify-between xl:flex-row">
  <NavigationBar></NavigationBar>
  <div class="flex grow flex-col md:flex-row xl:gap-2 xl:py-2 xl:pr-2">
    <Dashboard user={data.user}></Dashboard>
    <SidePanel></SidePanel>
  </div>
</div>

<style>
</style>
