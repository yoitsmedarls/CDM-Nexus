<script lang="ts">
  import Body from '$lib/components/admin/Body.svelte';
  import CalendarWidget from '$lib/components/admin/dashboard/sidepanel/CalendarWidget.svelte';
  import EventsWidget from '$lib/components/admin/dashboard/sidepanel/EventsWidget.svelte';
  import Header from '$lib/components/admin/Header.svelte';
  import MainWrapper from '$lib/components/admin/MainWrapper.svelte';
  import SidePanel from '$lib/components/admin/SidePanel.svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<MainWrapper>
  <Header
    title={'CDM Nexus Courses'}
    subtitle={'Add, modify, or delete existing courses.'}
  />
  <Body>
    {@render children()}
  </Body>
</MainWrapper>
<SidePanel>
  <CalendarWidget />
  <EventsWidget />
</SidePanel>
