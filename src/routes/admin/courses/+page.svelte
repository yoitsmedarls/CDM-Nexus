<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let courseImages: {
    id: string;
    url: string;
  }[] = $state([]);
  data.queriedCourses.forEach((course) => {
    courseImages.push({
      id: course.id,
      url: `https://picsum.photos/seed/${course.id}/600/200.webp`,
    });
  });
</script>

<svelte:head>
  <title>Manage Courses</title>
  <meta
    name="description"
    content="Course Management page for CDM Nexus Administrators."
  />
</svelte:head>

<section
  class="flex w-full flex-col justify-start gap-2 border-b-1 border-gray-100 p-2 pb-4"
>
  <h2
    class="font-poppins 2xs:text-xl w-fit pb-2 text-lg font-semibold text-gray-800 transition-all duration-100 sm:text-[1.375rem] lg:text-2xl"
  >
    Course List
  </h2>
  <div
    class="grid grid-cols-1 gap-2 transition-all duration-100 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
  >
    {#each data.queriedCourses as course, index (course.id)}
      <a
        href={`/admin/courses/${course.slug}`}
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
            class="font-poppins text-sm text-gray-600 transition-all duration-100 sm:text-base"
          >
            {course.id}
          </p>
          <h2
            class="font-poppins text-base font-semibold text-gray-800 transition-all duration-100 sm:text-lg"
          >
            {course.title}
          </h2>

          <div class="grow"></div>
          <p
            class="font-nunito flex flex-row justify-between pt-2 text-right text-sm text-gray-600 transition-all duration-100 sm:text-base md:pb-2"
          >
            <span
              class={[
                'font-nunito',
                course.published ? 'text-green-500' : 'text-cdm-red-600',
              ]}
            >
              {course.published ? 'Published' : 'Unpublished'}
            </span>
            <span>
              Status:
              <span
                class={[
                  'capitalize',
                  course.state === 'ongoing'
                    ? 'text-cdm-yellow-600'
                    : 'text-green-500',
                ]}
              >
                {course.state}
              </span>
            </span>
          </p>
        </hgroup>
      </a>
    {/each}
  </div>
</section>
