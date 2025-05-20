<script lang="ts">
  import type { PageProps } from './$types';

  import Wrapper from '$lib/components/routes/admin-tutor/Wrapper.svelte';
  import MainPanel from '$lib/components/routes/admin-tutor/MainPanel.svelte';
  import SidePanel from '$lib/components/routes/admin-tutor/SidePanel.svelte';
  import Calendar from '$lib/components/ui/Calendar.svelte';
  import InfoBox from '$lib/components/ui/InfoBox.svelte';
  import Separator from '$lib/components/ui/Separator.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import User from 'phosphor-svelte/lib/User';

  let { data }: PageProps = $props();

  let infoBoxes = $derived([
    {
      id: 'no-of-courses',
      info: data.courses.length.toString(),
      label: data.courses.length > 1 ? 'Courses' : 'Course',
      description: 'Published or Unpublished',
    },
    {
      id: 'no-of-tutors',
      info: data.tutors.length.toString(),
      label: data.tutors.length > 1 ? 'Tutors' : 'Tutor',
      description: 'Active or Inactive',
    },
    {
      id: 'no-of-students',
      info: data.students.length.toString(),
      label: data.students.length > 1 ? 'Students' : 'Student',
      description: 'With An Account',
    },
    {
      id: 'no-of-site-visits',
      info: data.courses
        .reduce((total, course) => total + course.visits, 0)
        .toString(),
      label:
        data.courses.reduce((total, course) => total + course.visits, 0) > 1
          ? 'Site Visits'
          : 'Site Visit',
      description: 'Across All Courses',
    },
  ]);
</script>

<svelte:head>
  <title>Dashboard</title>
  <meta name="description" content="Dashboard for CDM Nexus Administrators." />
</svelte:head>

<Wrapper>
  <MainPanel
    heading={`Welcome, ${data.user?.username}!`}
    subheading={`${data.user?.cdmEmail}!`}
    src="https://picsum.photos/seed/cdm/1440/200/?blur=10"
  >
    <section class="grid min-h-fit grid-cols-2 gap-2 pb-4 lg:grid-cols-4">
      {#each infoBoxes as box (box.id)}
        <InfoBox
          info={box.info}
          label={box.label}
          description={box.description}
        />
      {/each}
    </section>
    <Separator orientation="horizontal" decorative />
    <section class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-2">
      <div class="rounded-md border border-gray-100 bg-gray-50 px-3 py-4">
        <Button
          variant="underline"
          class={{
            button: 'pb-3 text-left text-lg font-semibold md:text-xl',
          }}
          href="/admin/courses"
        >
          All Courses
        </Button>
        <div class="flex flex-col gap-1">
          {#if data.courses.length >= 1}
            {#each data.courses as course (course.id)}
              <Button
                href={`/admin/courses/${course.slug}`}
                class={{
                  button: 'text-left',
                }}
              >
                <p
                  class="font-poppins text-xs leading-tight font-medium opacity-60"
                >
                  {course.id}
                </p>
                <h3 class="font-poppins leading-snug font-semibold">
                  {course.title}
                </h3>
                <p
                  class="font-nunito text-xs leading-tight font-normal opacity-90"
                >
                  Modified: {course.dateModified.toLocaleDateString(
                    navigator.language,
                    { dateStyle: 'medium' }
                  )}
                </p>
              </Button>
            {/each}
          {:else}
            <p class="font-poppins px-2 py-1 text-base font-normal">
              No courses yet...
            </p>
          {/if}
        </div>
      </div>
      <div class="rounded-md border border-gray-100 bg-gray-50 px-3 py-4">
        <Button
          variant="underline"
          href="/admin/tutors"
          class={{
            button: 'pb-3 text-left text-lg font-semibold md:text-xl',
          }}
        >
          All Tutors
        </Button>
        <div class="flex flex-col gap-1">
          {#if data.tutors.length >= 1}
            {#each data.tutors as tutor (tutor.id)}
              <Button
                href={`/admin/tutors/${tutor.username}`}
                class={{
                  button: 'text-left',
                }}
              >
                <div class="flex flex-row items-center justify-between gap-4">
                  <div
                    class="avatar mr-1 ml-2 flex max-h-9 min-h-9 max-w-9 min-w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-900/10 text-center align-middle text-red-950 outline-2 outline-offset-2 outline-red-900/50 transition-all duration-100 hover:cursor-pointer active:scale-[0.98]"
                  >
                    <User class="size-7" weight="regular" />
                  </div>
                  <div class="flex grow flex-col">
                    <p
                      class="font-poppins text-xs leading-tight font-medium opacity-60"
                    >
                      {tutor.username}
                    </p>
                    <h3 class="font-poppins leading-snug font-semibold">
                      {tutor.fullName}
                    </h3>
                    <p
                      class="font-nunito text-xs leading-tight font-normal opacity-90"
                    >
                      Joined: {tutor.dateJoined.toLocaleDateString(
                        navigator.language,
                        { dateStyle: 'medium' }
                      )}
                    </p>
                  </div>
                </div>
              </Button>
            {/each}
          {:else}
            <p
              class="font-poppins inline-flex flex-col justify-center rounded-md border border-gray-100 bg-white p-2 text-balance text-gray-800"
            >
              No tutors yet...
            </p>
          {/if}
        </div>
      </div>
    </section>
  </MainPanel>
  <SidePanel duration={200}>
    <Calendar />
  </SidePanel>
</Wrapper>
