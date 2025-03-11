<script lang="ts">
  import Body from '$lib/components/admin/Body.svelte';
  import Header from '$lib/components/admin/Header.svelte';
  import MainWrapper from '$lib/components/admin/MainWrapper.svelte';
  import SidePanel from '$lib/components/admin/SidePanel.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Manage Tutors</title>
  <meta
    name="description"
    content="Tutor Management page for CDM Nexus Administrators."
  />
</svelte:head>

<MainWrapper>
  <Header />
  <Body></Body>
</MainWrapper>
<SidePanel></SidePanel>
