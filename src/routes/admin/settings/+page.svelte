<script lang="ts">
  import type { PageProps } from './$types';

  import Calendar from '$lib/components/ui/Calendar.svelte';

  import MainPanel from '$lib/components/routes/admin-tutor/MainPanel.svelte';
  import SidePanel from '$lib/components/routes/admin-tutor/SidePanel.svelte';
  import Wrapper from '$lib/components/routes/admin-tutor/Wrapper.svelte';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Site Settings | CDM Nexus Admins</title>
  <meta
    name="description"
    content="Site-wide settings management page for CDM Nexus Administrators."
  />
</svelte:head>

<Wrapper>
  <MainPanel
    heading="Manage site features"
    subheading="Review, enable, or disable site features."
    src="https://picsum.photos/seed/cdm/1440/200/?blur=10"
  >
    <h1>Test</h1>
  </MainPanel>
  <SidePanel duration={200}>
    <Calendar />
  </SidePanel>
</Wrapper>
