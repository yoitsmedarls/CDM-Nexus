<script lang="ts">
  import type { PageProps } from './$types';

  import Calendar from '$lib/components/ui/Calendar.svelte';

  import MainPanel from '$lib/components/routes/admin-tutor/MainPanel.svelte';
  import SidePanel from '$lib/components/routes/admin-tutor/SidePanel.svelte';
  import Wrapper from '$lib/components/routes/admin-tutor/Wrapper.svelte';

  let { data, form }: PageProps = $props();

  let courseImages: {
    id: string;
    url: string;
  }[] = $state([]);
  data.courses.forEach((course) => {
    courseImages.push({
      id: course.id,
      url: `https://picsum.photos/seed/${course.id}/600/200.webp`,
    });
  });
</script>

<svelte:head>
  <title>Manage Courses | CDM Nexus Tutors</title>
  <meta
    name="description"
    content="Course management page for CDM Nexus Tutors."
  />
</svelte:head>

<Wrapper>
  <MainPanel
    heading="Manage courses"
    subheading="Add, modify, or delete existing courses."
    src="https://picsum.photos/seed/cdm/1440/200/?blur=10"
  >
    <section class="flex w-full flex-col justify-start gap-4 p-2 pb-4">
      <div class="flex flex-row items-center justify-between">
        <h2
          class="font-poppins w-fit text-xl font-semibold text-gray-800 transition-all duration-100 md:text-2xl"
        >
          Course List
        </h2>
      </div>
      <div
        class="grid grid-cols-1 gap-2 transition-all duration-100 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
      >
        {#each data.courses as course, index (course.id)}
          <a
            href={`/tutor/courses/${course.slug}`}
            class="flex min-w-fit flex-col gap-2 rounded-md border-1 border-gray-200 bg-white p-2 drop-shadow-xs transition-all duration-100 hover:bg-gray-50 active:bg-gray-100"
          >
            <div class="block h-fit w-full rounded-sm">
              <img
                src={courseImages.at(index)?.url}
                class="block h-full min-h-48 w-full rounded-sm select-none"
                alt={course.id}
              />
            </div>
            <hgroup class="flex grow flex-col px-1">
              <p
                class="font-poppins text-sm text-gray-600 transition-all duration-100 md:text-base"
              >
                {course.id}
              </p>
              <h2
                class="font-poppins text-base font-semibold text-gray-800 transition-all duration-100 md:text-lg"
              >
                {course.title}
              </h2>

              <div class="grow"></div>
              <p
                class="font-nunito flex flex-row justify-between pt-2 text-right text-sm text-gray-600 transition-all duration-100 md:pb-2 md:text-base"
              >
                <span
                  class={[
                    'font-nunito',
                    course.published ? 'text-green-500' : 'text-red-600',
                  ]}
                >
                  {course.published ? 'Published' : 'Unpublished'}
                </span>
                <span>
                  Status:
                  <span
                    class={[
                      'capitalize',
                      course.status === 'ongoing'
                        ? 'text-yellow-600'
                        : 'text-green-500',
                    ]}
                  >
                    {course.status}
                  </span>
                </span>
              </p>
            </hgroup>
          </a>
        {/each}
      </div>
    </section>
  </MainPanel>
  <SidePanel duration={200}>
    <Calendar />
  </SidePanel>
</Wrapper>
