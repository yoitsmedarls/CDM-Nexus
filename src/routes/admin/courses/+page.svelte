<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageProps } from './$types';

  let { form, data }: PageProps = $props();

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

  let addCoursePanelVisible = $state(false);
</script>

<svelte:head>
  <title>Manage Courses</title>
  <meta
    name="description"
    content="Course Management page for CDM Nexus Administrators."
  />
</svelte:head>

<section
  class="flex w-full flex-col justify-start gap-4 border-b-1 border-gray-100 p-2 pb-4"
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
  <div
    class="max-md:relative max-md:inset-0 max-md:flex max-md:grow max-md:flex-col"
  >
    <button
      class={[
        addCoursePanelVisible ? 'hidden' : 'block',
        'font-poppins border-cdm-blue-900 text-cdm-blue-900 hover:bg-cdm-blue-900 active:bg-cdm-blue-950 active:border-cdm-blue-950 rounded-md border-2 bg-white px-4 py-2 text-sm font-semibold transition-all duration-100 hover:text-white active:text-white md:ml-auto lg:text-base xl:text-center',
      ]}
      onclick={() => (addCoursePanelVisible = !addCoursePanelVisible)}
    >
      Add Course
    </button>
    <div
      class={[
        addCoursePanelVisible ? 'fixed' : 'hidden',
        'inset-0 flex h-full w-full flex-col bg-[#00000040] p-4 md:justify-center md:align-middle',
      ]}
    >
      <form
        method="post"
        action="?/addCourse"
        class="mx-auto flex w-full max-w-4xl min-w-sm flex-col rounded-md bg-white p-4 drop-shadow-md max-md:h-full md:h-fit"
      >
        <div class="flex flex-row justify-between pb-2">
          <h1
            class="font-poppins 2xs:text-base text-cdm-blue-950 w-fit pb-2 text-sm font-semibold transition-all duration-100 sm:text-lg lg:text-xl"
          >
            Add a course
          </h1>
          <button
            type="button"
            class={[addCoursePanelVisible ? 'block' : 'hidden']}
            onclick={() => (addCoursePanelVisible = !addCoursePanelVisible)}
          >
            <span
              class="material-symbols-rounded hover:bg-cdm-red-50 active:bg-cdm-red-100 rounded-md transition-all duration-100"
            >
              <span
                class="text-cdm-red-800 2xs:text-[1.625rem] px-1 text-2xl transition-all duration-100 sm:text-3xl"
              >
                close
              </span>
            </span>
          </button>
        </div>
        <fieldset class="flex flex-col pb-2 md:flex-row">
          <label
            for="course-id"
            class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
          >
            Course Code:
          </label>
          <input
            required
            minlength="8"
            name="course-id"
            id="course-id"
            type="text"
            maxlength="8"
            placeholder="CODE0000"
            class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 transition-all duration-100"
          />
        </fieldset>
        <fieldset class="flex flex-col pb-2 md:flex-row">
          <label
            for="course-title"
            class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
          >
            Title:
          </label>
          <input
            required
            name="course-title"
            id="course-title"
            type="text"
            maxlength="255"
            placeholder="Course Title"
            class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 transition-all duration-100"
          />
        </fieldset>
        <fieldset class="flex flex-col pb-2 md:flex-row">
          <label
            for="course-description"
            class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
          >
            Description:
          </label>
          <textarea
            required
            id="course-description"
            name="course-description"
            placeholder="Describe the coverage of the course."
            class="font-nunito inline-block field-sizing-fixed min-h-20 w-full resize-y rounded-xs border-1 border-gray-200 p-1 text-gray-700"
          ></textarea>
        </fieldset>
        <fieldset class="flex flex-row justify-end gap-4">
          <p class="text-cdm-red-600 font-nunito inline-block py-2 pr-2">
            {#if form?.message}
              {form?.message ?? ''}
            {/if}
          </p>
          <button
            type="submit"
            class="font-poppins border-cdm-blue-900 text-cdm-blue-900 hover:bg-cdm-blue-900 active:bg-cdm-blue-950 active:border-cdm-blue-950 rounded-md border-2 bg-white px-4 py-2 text-sm font-semibold transition-all duration-100 hover:text-white active:text-white lg:text-base xl:text-center"
            >Add Course</button
          >
        </fieldset>
      </form>
    </div>
  </div>
</section>

<style>
  .material-symbols-rounded {
    font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24;
  }
</style>
