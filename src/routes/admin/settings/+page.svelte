<script lang="ts">
  import type { PageProps } from './$types';

  import Calendar from '$lib/components/ui/Calendar.svelte';

  import MainPanel from '$lib/components/routes/admin-tutor/MainPanel.svelte';
  import SidePanel from '$lib/components/routes/admin-tutor/SidePanel.svelte';
  import Wrapper from '$lib/components/routes/admin-tutor/Wrapper.svelte';
  import Switch from '$lib/components/ui/Switch.svelte';
  import Button from '$lib/components/ui/Button.svelte';

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
    <form
      method="post"
      action="?/updateSettings"
      class="flex flex-col justify-start gap-4"
    >
      <div class="flex flex-row items-center justify-between">
        <h1 class="font-poppins text-xl font-medium text-gray-800 md:text-2xl">
          Toggle web app features
        </h1>
        <Button
          type="submit"
          variant="primary"
          class={{ span: 'text-sm md:text-base' }}
        >
          Save settings
        </Button>
      </div>
      <section class="grid min-h-fit grid-cols-1 gap-2 pb-4 md:grid-cols-3">
        <div
          class="flex flex-row items-center justify-start overflow-clip rounded-md border-gray-100 bg-white p-4 drop-shadow-sm"
        >
          <Switch
            checked={data.features.coursesPlatform}
            labelText={'Courses Platform'}
            id="courses_platform"
            name="courses_platform"
          />
        </div>
        <div
          class="flex flex-row items-center justify-start overflow-clip rounded-md border-gray-100 bg-white p-4 drop-shadow-sm"
        >
          <Switch
            checked={data.features.tutorApplications}
            labelText={'Tutor Applications'}
            id="tutoring_applications"
            name="tutoring_applications"
          />
        </div>
        <div
          class="flex flex-row items-center justify-start overflow-clip rounded-md border-gray-100 bg-white p-4 drop-shadow-sm"
        >
          <Switch
            checked={data.features.tutorRequests}
            labelText={'Tutor Requests'}
            id="tutor_requests"
            name="tutor_requests"
          />
        </div>
      </section>
    </form>
  </MainPanel>
  <SidePanel duration={200}>
    <Calendar />
  </SidePanel>
</Wrapper>
