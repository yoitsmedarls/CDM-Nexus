<script lang="ts">
  import type { PageProps } from './$types';

  import Wrapper from '$lib/components/routes/admin-tutor/Wrapper.svelte';
  import MainPanel from '$lib/components/routes/admin-tutor/MainPanel.svelte';
  import SidePanel from '$lib/components/routes/admin-tutor/SidePanel.svelte';
  import Calendar from '$lib/components/ui/Calendar.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Dashboard | CDM Nexus Tutors</title>
  <meta name="description" content="Dashboard for CDM Nexus Tutors." />
</svelte:head>

<Wrapper>
  <MainPanel
    heading={`Welcome, ${data.user?.username}!`}
    subheading={`${data.user?.cdmEmail}!`}
    src="https://picsum.photos/seed/cdm/1440/200/?blur=10"
  >
    <section class="grid grid-cols-1 gap-2">
      <div
        class="flex flex-col justify-start gap-3 rounded-md border border-gray-100 bg-gray-50 px-3 py-4"
      >
        <div class="flex flex-row justify-start">
          <Button
            variant="underline"
            class={{
              button: 'text-left text-lg font-semibold md:text-xl',
            }}
            href="/tutor/courses"
          >
            Courses
          </Button>
        </div>
        <div class="flex grow flex-col justify-between gap-4">
          <div class="flex grow flex-col gap-1">
            {#if data.courses.length >= 1}
              {#each data.courses as course (course.id)}
                <Button
                  href={`/tutor/courses/${course.slug}`}
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
      </div>
    </section>
  </MainPanel>
  <SidePanel duration={200}>
    <Calendar />
  </SidePanel>
</Wrapper>
