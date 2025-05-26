<script lang="ts">
  import type { PageProps } from './$types';

  import Calendar from '$lib/components/ui/Calendar.svelte';

  import MainPanel from '$lib/components/routes/admin-tutor/MainPanel.svelte';
  import SidePanel from '$lib/components/routes/admin-tutor/SidePanel.svelte';
  import Wrapper from '$lib/components/routes/admin-tutor/Wrapper.svelte';
  import { enhance } from '$app/forms';
  import Button from '$lib/components/ui/Button.svelte';
  import X from 'phosphor-svelte/lib/X';

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

  let addCoursePanelVisible = $state(false);
</script>

<svelte:head>
  <title>Manage Courses | CDM Nexus Admins</title>
  <meta
    name="description"
    content="Course management page for CDM Nexus Administrators."
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
        <Button
          variant="primary"
          onclick={() => (addCoursePanelVisible = !addCoursePanelVisible)}
          class={{ span: 'text-sm md:text-base' }}
        >
          Add Course
        </Button>
      </div>
      <div
        class="grid grid-cols-1 gap-2 transition-all duration-100 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
      >
        {#each data.courses as course, index (course.id)}
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

<div
  class={[
    addCoursePanelVisible ? 'fixed' : 'hidden',
    'inset-0 z-100 flex h-full w-full flex-col justify-center bg-[#00000040] p-4 align-middle',
  ]}
>
  <form
    method="post"
    action="?/addCourse"
    use:enhance
    class="mx-auto flex h-fit w-full max-w-4xl flex-col rounded-md bg-white p-4 drop-shadow-md"
  >
    <div class="flex flex-row justify-between pb-2">
      <h1
        class="font-poppins w-fit pb-2 text-xl font-semibold text-blue-900 transition-all duration-100"
      >
        Add a course
      </h1>
      <button
        type="button"
        class="font-poppins inline-flex max-h-fit min-h-fit max-w-fit min-w-fit flex-row justify-start gap-3 overflow-clip rounded-md border-0 bg-white p-1 text-center align-middle font-medium text-balance text-gray-800 outline-transparent transition-colors duration-100 hover:cursor-pointer not-disabled:hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400/50 active:scale-[0.98] not-disabled:active:bg-red-200 not-disabled:active:text-red-950 disabled:cursor-not-allowed disabled:opacity-50"
        onclick={() => (addCoursePanelVisible = !addCoursePanelVisible)}
      >
        <X class="size-6" weight="bold" />
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
        id="course-description"
        name="course-description"
        placeholder="Describe the coverage of the course."
        class="font-nunito inline-block field-sizing-fixed min-h-20 w-full resize-y rounded-xs border-1 border-gray-200 p-1 text-gray-700"
      ></textarea>
    </fieldset>
    <fieldset class="flex flex-row justify-end gap-4">
      <p class="font-nunito inline-block py-2 pr-2 text-red-600">
        {#if form?.message}
          {form?.message ?? ''}
        {/if}
      </p>
      <Button
        variant="primary"
        type="submit"
        class={{ span: 'text-sm md:text-base' }}
      >
        Add Course
      </Button>
    </fieldset>
  </form>
</div>
