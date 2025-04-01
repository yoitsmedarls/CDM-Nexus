<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageProps } from './$types';

  let { form, data }: PageProps = $props();

  let lesson = $state(data.queriedLesson);
</script>

<section
  class="flex w-full flex-col justify-start gap-4 border-b-1 border-gray-100 p-2 pb-4"
>
  <section class="border-b-1 border-gray-100 pb-2">
    <h2
      class="font-poppins 2xs:text-xl text-cdm-blue-950 w-fit pb-2 text-lg font-semibold transition-all duration-100 sm:text-[1.375rem] lg:text-2xl"
    >
      {data.queriedLesson.title}
    </h2>
    <div class="flex flex-row pb-2">
      <p
        class="font-nunito inline-block pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
      >
        Last Modified:
      </p>
      <p class="font-nunito text-gray-700">
        {data.queriedLesson?.dateModified.toLocaleDateString(
          navigator.language,
          {
            dateStyle: 'medium',
          }
        )}
      </p>
    </div>
    <form
      class="flex flex-col"
      method="post"
      action="?/updateLesson"
      use:enhance
    >
      <fieldset class="flex flex-col pb-2 md:flex-row">
        <label
          for="lesson-id"
          class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
        >
          ID:
        </label>
        <input
          name="lesson-id"
          id="lesson-id"
          type="text"
          readonly
          bind:value={lesson.id}
          class="font-nunito w-full rounded-xs border-0 p-0 text-gray-700 transition-all duration-100"
        />
      </fieldset>
      <fieldset class="flex flex-col pb-2 md:flex-row">
        <label
          for="lesson-course-id"
          class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
        >
          From Course:
        </label>
        <input
          name="lesson-course-id"
          id="lesson-course-id"
          type="text"
          maxlength="8"
          bind:value={lesson.courseId}
          class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 transition-all duration-100"
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
          bind:value={lesson.title}
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
          class="font-nunito inline-block field-sizing-fixed min-h-20 w-full resize-y rounded-xs border-1 border-gray-200 p-1 text-gray-700"
          >{lesson.description.trim()}</textarea
        >
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
          bind:value={lesson.term}
          class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 capitalize transition-all duration-100"
        >
          <option class="font-nunito" value="midterm">Midterm</option>
          <option class="font-nunito" value="finals">Finals</option>
        </select>
      </fieldset>
      <fieldset class="flex flex-col pb-2 md:flex-row">
        <label
          for="lesson-published"
          class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
        >
          Visibility:
        </label>
        <select
          name="lesson-published"
          id="lesson-published"
          bind:value={lesson.published}
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
          >Update Lesson</button
        >
        <button
          formaction="?/deleteLesson"
          class="font-poppins border-cdm-red-700 text-cdm-red-700 hover:bg-cdm-red-700 active:bg-cdm-red-800 active:border-cdm-red-800 rounded-md border-2 bg-white px-4 py-2 text-sm font-semibold transition-all duration-100 hover:text-white active:text-white lg:text-base xl:text-center"
          >Delete Lesson</button
        >
      </fieldset>
    </form>
  </section>
  <section class="flex flex-col gap-2 transition-all duration-100">
    <h2
      class="font-poppins 2xs:text-xl text-cdm-blue-950 w-fit pb-2 text-lg font-semibold transition-all duration-100 sm:text-[1.375rem] lg:text-2xl"
    >
      Topics
    </h2>
    <ul
      class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {#each data.queriedTopics as topic}
        <li>
          <a
            class="font-nunito hover:text-cdm-blue-900 active:text-cdm-blue-950 inline-block w-full rounded-sm border-1 border-gray-200 p-2 text-sm transition-all duration-100 hover:bg-gray-50 active:bg-gray-100 sm:text-base lg:text-lg"
            href={`${lesson.slug}/${topic.slug}`}
          >
            {topic.title}
          </a>
        </li>
      {/each}
    </ul>
  </section>
</section>
