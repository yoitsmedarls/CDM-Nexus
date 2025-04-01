<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageProps } from './$types';

  let { form, data }: PageProps = $props();

  let course = $state(data.queriedCourse);
</script>

<section
  class="flex w-full flex-col justify-start gap-4 border-b-1 border-gray-100 p-2 pb-4"
>
  <section class="border-b-1 border-gray-100 pb-2">
    <h2
      class="font-poppins 2xs:text-xl text-cdm-blue-950 w-fit pb-2 text-lg font-semibold transition-all duration-100 sm:text-[1.375rem] lg:text-2xl"
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
    <form
      class="flex flex-col"
      method="post"
      action="?/updateCourse"
      use:enhance
    >
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
          >{course.description.trim()}</textarea
        >
      </fieldset>
      <fieldset class="flex flex-col pb-2 md:flex-row">
        <label
          for="course-state"
          class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
        >
          Status:
        </label>
        <select
          name="course-state"
          id="course-state"
          bind:value={course.state}
          class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 capitalize transition-all duration-100"
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
        >
          <option class="font-nunito" value={false}>Unpublished</option>
          <option class="font-nunito" value={true}>Published</option>
        </select>
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
          >Update Course</button
        >
        <button
          formaction="?/deleteCourse"
          class="font-poppins border-cdm-red-700 text-cdm-red-700 hover:bg-cdm-red-700 active:bg-cdm-red-800 active:border-cdm-red-800 rounded-md border-2 bg-white px-4 py-2 text-sm font-semibold transition-all duration-100 hover:text-white active:text-white lg:text-base xl:text-center"
          >Delete Course</button
        >
      </fieldset>
    </form>
  </section>
  <section class="flex flex-col gap-2 transition-all duration-100">
    <h2
      class="font-poppins 2xs:text-xl text-cdm-blue-950 w-fit pb-2 text-lg font-semibold transition-all duration-100 sm:text-[1.375rem] lg:text-2xl"
    >
      Lessons
    </h2>
    <div class="flex flex-col gap-4 md:grid md:grid-cols-2">
      <div
        class="flex flex-col gap-2 rounded-sm border-gray-200 md:border-1 md:p-2"
      >
        <h3
          class="font-poppins 2xs:text-base w-fit pb-2 text-sm font-medium text-gray-800 transition-all duration-100 sm:text-lg lg:text-xl"
        >
          Midterms
        </h3>
        <ul class="flex flex-col justify-start gap-2">
          {#each data.queriedLessons as lesson (lesson.id)}
            {#if lesson.term === 'midterm'}
              <li>
                <a
                  class="font-nunito hover:text-cdm-blue-900 active:text-cdm-blue-950 inline-block w-full rounded-sm border-1 border-gray-200 p-2 text-sm transition-all duration-100 hover:bg-gray-50 active:bg-gray-100 sm:text-base lg:text-lg"
                  href={`/admin/courses/${data.queriedCourse.slug}/${lesson.slug}`}
                >
                  {lesson.title}
                </a>
              </li>
            {/if}
          {/each}
        </ul>
      </div>
      <div
        class="flex flex-col gap-2 rounded-sm border-gray-200 md:border-1 md:p-2"
      >
        <h3
          class="font-poppins 2xs:text-base w-fit pb-2 text-sm font-medium text-gray-800 transition-all duration-100 sm:text-lg lg:text-xl"
        >
          Finals
        </h3>
        <ul class="flex flex-col justify-start gap-2">
          {#each data.queriedLessons as lesson (lesson.id)}
            {#if lesson.term === 'finals'}
              <li>
                <a
                  class="font-nunito hover:text-cdm-blue-900 active:text-cdm-blue-950 inline-block w-full rounded-sm border-1 border-gray-200 p-2 text-sm transition-all duration-100 hover:bg-gray-50 active:bg-gray-100 sm:text-base lg:text-lg"
                  href={`${data.queriedCourse.slug}/${lesson.slug}`}
                >
                  {lesson.title}
                </a>
              </li>
            {/if}
          {/each}
        </ul>
      </div>
    </div>
  </section>
</section>
