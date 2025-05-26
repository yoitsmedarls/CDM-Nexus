<script lang="ts">
  import type { PageProps } from './$types';

  import Calendar from '$lib/components/ui/Calendar.svelte';

  import MainPanel from '$lib/components/routes/admin-tutor/MainPanel.svelte';
  import SidePanel from '$lib/components/routes/admin-tutor/SidePanel.svelte';
  import Wrapper from '$lib/components/routes/admin-tutor/Wrapper.svelte';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Manage Students | CDM Nexus Admins</title>
  <meta
    name="description"
    content="Student management page for CDM Nexus Administrators."
  />
</svelte:head>

<Wrapper>
  <MainPanel
    heading="Manage students"
    subheading="View all students and review their requests for tutors."
    src="https://picsum.photos/seed/cdm/1440/200/?blur=10"
  >
    <h1>Test</h1>
  </MainPanel>
  <SidePanel duration={200}>
    <Calendar />
  </SidePanel>
</Wrapper>
