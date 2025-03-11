<script lang="ts">
  import MainWrapper from '$lib/components/admin/MainWrapper.svelte';
  import SidePanel from '$lib/components/admin/SidePanel.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Manage Courses</title>
  <meta
    name="description"
    content="Course management page for CDM Nexus Administrators."
  />
</svelte:head>

<MainWrapper>
  <div class="flex grow flex-col rounded-md border-gray-200 p-2 xl:border-1">
    <h1>Courses</h1>
  </div>
</MainWrapper>
<SidePanel></SidePanel>
