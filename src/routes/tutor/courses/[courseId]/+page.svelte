<script lang="ts">
  import type { PageProps } from './$types';

  import Calendar from '$lib/components/ui/Calendar.svelte';

  import MainPanel from '$lib/components/routes/admin-tutor/MainPanel.svelte';
  import SidePanel from '$lib/components/routes/admin-tutor/SidePanel.svelte';
  import Wrapper from '$lib/components/routes/admin-tutor/Wrapper.svelte';
  import { enhance } from '$app/forms';
  import Button from '$lib/components/ui/Button.svelte';
  import Separator from '$lib/components/ui/Separator.svelte';
  import X from 'phosphor-svelte/lib/X';

  let { data, form }: PageProps = $props();

  let course = $state(data.course);
  let addLessonPanelVisible = $state(false);
</script>

<svelte:head>
  <title>Edit Course | CDM Nexus Tutors</title>
  <meta
    name="description"
    content="Course editing page for CDM Nexus Tutors."
  />
</svelte:head>

<Wrapper>
  <MainPanel
    heading="Edit course"
    subheading="Modify or delete course details."
    src="https://picsum.photos/seed/cdm/1440/200/?blur=10"
  >
    <section class="flex w-full flex-col justify-start gap-4 p-2 pb-4">
      <section class="pb-2">
        <h2
          class="font-poppins 2xs:text-xl w-fit pb-2 text-lg font-semibold text-blue-900 transition-all duration-100 sm:text-[1.375rem] lg:text-2xl"
        >
          {course.title}
        </h2>
        <div class="flex flex-row pb-2">
          <p
            class="font-nunito inline-block pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
          >
            Last Modified:
          </p>
          <p class="font-nunito text-gray-700">
            {course.dateModified.toLocaleDateString(navigator.language, {
              dateStyle: 'medium',
            })}
          </p>
        </div>
        <fieldset class="flex flex-col pb-2 md:flex-row">
          <label
            for="course-id"
            class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
          >
            Course Code:
          </label>
          <input
            name="course-id"
            id="course-id"
            type="text"
            maxlength="8"
            bind:value={course.id}
            class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 transition-all duration-100"
            disabled
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
            bind:value={course.title}
            class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 transition-all duration-100"
            disabled
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
            class="font-nunito inline-block field-sizing-fixed min-h-20 w-full resize-y rounded-xs border-1 border-gray-200 p-1 text-gray-700"
            disabled
          >
            {course.description.trim()}
          </textarea>
        </fieldset>
        <fieldset class="flex flex-col pb-2 md:flex-row">
          <label
            for="course-status"
            class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
          >
            Status:
          </label>
          <select
            name="course-status"
            id="course-status"
            bind:value={course.status}
            class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 capitalize transition-all duration-100"
            disabled
          >
            <option class="font-nunito" value="ongoing">Ongoing</option>
            <option class="font-nunito" value="complete">Complete</option>
          </select>
        </fieldset>
        <fieldset class="flex flex-col pb-2 md:flex-row">
          <label
            for="course-published"
            class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
          >
            Visibility:
          </label>
          <select
            name="course-published"
            id="course-published"
            bind:value={course.published}
            class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 capitalize transition-all duration-100"
            disabled
          >
            <option class="font-nunito" value={false}>Unpublished</option>
            <option class="font-nunito" value={true}>Published</option>
          </select>
        </fieldset>
      </section>
      <Separator orientation="horizontal" />
      <section class="flex flex-col gap-2 transition-all duration-100">
        <div class="flex flex-row items-center justify-between">
          <h2
            class="font-poppins 2xs:text-xl w-fit pb-2 text-lg font-semibold text-blue-900 transition-all duration-100 sm:text-[1.375rem] lg:text-2xl"
          >
            Lessons
          </h2>
          <Button
            variant="primary"
            onclick={() => (addLessonPanelVisible = !addLessonPanelVisible)}
            class={{ span: 'text-sm md:text-base' }}
          >
            Add Lesson
          </Button>
        </div>
        <div class="flex flex-col gap-4 md:grid md:grid-cols-2">
          <div
            class="flex flex-col gap-2 rounded-sm border-gray-200 md:border-1 md:px-2 md:pt-3 md:pb-2"
          >
            <h3
              class="font-poppins 2xs:text-base w-fit pb-2 text-sm font-medium text-gray-800 transition-all duration-100 sm:text-lg lg:text-xl"
            >
              Midterms
            </h3>
            <ul class="flex flex-col justify-start gap-2">
              {#each data.lessons as lesson (lesson.id)}
                {#if lesson.term === 'midterm'}
                  <li>
                    <Button
                      variant="outline"
                      href={`/tutor/courses/${data.course.slug}/${lesson.slug}`}
                      class={{
                        button: 'w-full',
                        span: 'text-left text-sm font-normal md:text-base',
                      }}
                    >
                      {lesson.title}
                    </Button>
                  </li>
                {/if}
              {/each}
            </ul>
          </div>
          <div
            class="flex flex-col gap-2 rounded-sm border-gray-200 md:border-1 md:px-2 md:pt-3 md:pb-2"
          >
            <h3
              class="font-poppins 2xs:text-base w-fit pb-2 text-sm font-medium text-gray-800 transition-all duration-100 sm:text-lg lg:text-xl"
            >
              Finals
            </h3>
            <ul class="flex flex-col justify-start gap-2">
              {#each data.lessons as lesson (lesson.id)}
                {#if lesson.term === 'finals'}
                  <li>
                    <Button
                      variant="outline"
                      href={`/tutor/courses/${data.course.slug}/${lesson.slug}`}
                      class={{
                        button: 'w-full',
                        span: 'text-left text-sm font-normal md:text-base',
                      }}
                    >
                      {lesson.title}
                    </Button>
                  </li>
                {/if}
              {/each}
            </ul>
          </div>
        </div>
      </section>
    </section>
  </MainPanel>
  <SidePanel duration={200}>
    <Calendar />
  </SidePanel>
</Wrapper>

<div
  class={[
    addLessonPanelVisible ? 'fixed' : 'hidden',
    'inset-0 z-100 flex h-full w-full flex-col justify-center bg-[#00000040] p-4 align-middle',
  ]}
>
  <form
    method="post"
    action="?/addLesson"
    use:enhance
    class="mx-auto flex h-fit w-full max-w-4xl flex-col rounded-md bg-white p-4 drop-shadow-md"
  >
    <div class="flex flex-row justify-between pb-2">
      <h1
        class="font-poppins 2xs:text-base w-fit pb-2 text-sm font-semibold text-blue-900 transition-all duration-100 sm:text-lg lg:text-xl"
      >
        Add a lesson
      </h1>
      <button
        type="button"
        class="font-poppins inline-flex max-h-fit min-h-fit max-w-fit min-w-fit flex-row justify-start gap-3 overflow-clip rounded-md border-0 bg-white p-1 text-center align-middle font-medium text-balance text-gray-800 outline-transparent transition-colors duration-100 hover:cursor-pointer not-disabled:hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400/50 active:scale-[0.98] not-disabled:active:bg-red-200 not-disabled:active:text-red-950 disabled:cursor-not-allowed disabled:opacity-50"
        onclick={() => (addLessonPanelVisible = !addLessonPanelVisible)}
      >
        <X class="size-6" weight="bold" />
      </button>
    </div>
    <fieldset class="flex flex-col pb-2 md:flex-row">
      <label
        for="lesson-course-id"
        class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
      >
        Course Code:
      </label>
      <input
        readonly
        minlength="8"
        name="lesson-course-id"
        id="lesson-course-id"
        type="text"
        maxlength="8"
        bind:value={course.id}
        class="font-nunito w-full rounded-xs border-0 border-gray-200 p-0 text-gray-700 transition-all duration-100"
      />
    </fieldset>
    <fieldset class="flex flex-col pb-2 md:flex-row">
      <label
        for="lesson-title"
        class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
      >
        Title:
      </label>
      <input
        name="lesson-title"
        id="lesson-title"
        type="text"
        maxlength="255"
        placeholder="Lesson Title"
        class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 transition-all duration-100"
      />
    </fieldset>
    <fieldset class="flex flex-col pb-2 md:flex-row">
      <label
        for="lesson-description"
        class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
      >
        Description:
      </label>
      <textarea
        id="lesson-description"
        name="lesson-description"
        placeholder="Describe the coverage of the lesson."
        class="font-nunito inline-block field-sizing-fixed min-h-20 w-full resize-y rounded-xs border-1 border-gray-200 p-1 text-gray-700"
      ></textarea>
    </fieldset>
    <fieldset class="flex flex-col pb-2 md:flex-row">
      <label
        for="lesson-term"
        class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
      >
        Term:
      </label>
      <select
        name="lesson-term"
        id="lesson-term"
        class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 capitalize transition-all duration-100"
      >
        <option class="font-nunito" value="midterm">Midterm</option>
        <option class="font-nunito" value="finals">Finals</option>
      </select>
    </fieldset>
    <fieldset class="flex flex-row justify-end gap-4">
      <p class="font-nunito inline-block py-2 pr-2 text-red-600">
        {#if form?.addLessonMessage}
          {form?.addLessonMessage ?? ''}
        {/if}
      </p>
      <Button
        variant="primary"
        type="submit"
        class={{ span: 'text-sm md:text-base' }}
      >
        Add Lesson
      </Button>
    </fieldset>
  </form>
</div>
