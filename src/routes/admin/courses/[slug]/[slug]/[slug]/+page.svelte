<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageProps } from './$types';

  let { form, data }: PageProps = $props();

  let topic = $state(data.queriedTopic);
  let lectureMaterial = $state(data.queriedLectureMaterial);
  let quizQuestions = $state(data.queriedQuizQuestions);

  let addLectureMaterialPanelVisible = $state(false);
</script>

<section
  class="flex w-full flex-col justify-start gap-4 border-b-1 border-gray-100 p-2 pb-4"
>
  <section class="border-b-1 border-gray-100 pb-2">
    <h2
      class="font-poppins 2xs:text-xl text-cdm-blue-950 w-fit pb-2 text-lg font-semibold transition-all duration-100 sm:text-[1.375rem] lg:text-2xl"
    >
      {topic.title}
    </h2>
    <div class="flex flex-row pb-2">
      <p
        class="font-nunito inline-block pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
      >
        Last Modified:
      </p>
      <p class="font-nunito text-gray-700">
        {topic.dateModified.toLocaleDateString(navigator.language, {
          dateStyle: 'medium',
        })}
      </p>
    </div>
    <form
      class="flex flex-col"
      method="post"
      action="?/updateTopic"
      use:enhance
    >
      <fieldset class="hidden pb-2 md:flex-row">
        <label
          for="topic-id"
          class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
        >
          ID:
        </label>
        <input
          name="topic-id"
          id="topic-id"
          type="text"
          readonly
          bind:value={topic.id}
          class="font-nunito w-full rounded-xs border-0 p-0 text-gray-700 transition-all duration-100"
        />
      </fieldset>
      <fieldset class="hidden pb-2 md:flex-row">
        <label
          for="topic-lesson-id"
          class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
        >
          From Lesson:
        </label>
        <input
          name="topic-lesson-id"
          id="topic-lesson-id"
          type="text"
          readonly
          bind:value={topic.lessonId}
          class="font-nunito w-full rounded-xs border-0 p-0 text-gray-700 transition-all duration-100"
        />
      </fieldset>
      <fieldset class="flex flex-col pb-2 md:flex-row">
        <label
          for="topic-title"
          class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
        >
          Title:
        </label>
        <input
          name="topic-title"
          id="topic-title"
          type="text"
          maxlength="255"
          bind:value={topic.title}
          class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 transition-all duration-100"
        />
      </fieldset>
      <fieldset class="flex flex-col pb-2 md:flex-row">
        <label
          for="topic-description"
          class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
        >
          Description:
        </label>
        <textarea
          id="topic-description"
          name="topic-description"
          class="font-nunito inline-block field-sizing-fixed min-h-20 w-full resize-y rounded-xs border-1 border-gray-200 p-1 text-gray-700"
          >{topic.description.trim()}</textarea
        >
      </fieldset>
      <fieldset class="flex flex-col pb-2 md:flex-row">
        <label
          for="topic-published"
          class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
        >
          Visibility:
        </label>
        <select
          name="topic-published"
          id="topic-published"
          bind:value={topic.published}
          class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 capitalize transition-all duration-100"
        >
          <option class="font-nunito" value={false}>Unpublished</option>
          <option class="font-nunito" value={true}>Published</option>
        </select>
      </fieldset>
      <fieldset class="flex flex-row justify-end gap-4">
        <p class="text-cdm-red-600 font-nunito inline-block py-2 pr-2">
          {#if form?.topicMessage}
            {form?.topicMessage ?? ''}
          {/if}
        </p>
        <button
          type="submit"
          class="font-poppins border-cdm-blue-900 text-cdm-blue-900 hover:bg-cdm-blue-900 active:bg-cdm-blue-950 active:border-cdm-blue-950 rounded-md border-2 bg-white px-4 py-2 text-sm font-semibold transition-all duration-100 hover:text-white active:text-white lg:text-base xl:text-center"
          >Update Topic</button
        >
        <button
          formaction="?/deleteTopic"
          class="font-poppins border-cdm-red-700 text-cdm-red-700 hover:bg-cdm-red-700 active:bg-cdm-red-800 active:border-cdm-red-800 rounded-md border-2 bg-white px-4 py-2 text-sm font-semibold transition-all duration-100 hover:text-white active:text-white lg:text-base xl:text-center"
          >Delete Topic</button
        >
      </fieldset>
    </form>
  </section>
  <section
    class="flex min-h-fit flex-col gap-2 border-b-1 border-gray-100 pb-4 transition-all duration-100"
  >
    <h2
      class="font-poppins 2xs:text-xl text-cdm-blue-950 w-fit pb-2 text-lg font-semibold transition-all duration-100 sm:text-[1.375rem] lg:text-2xl"
    >
      Lecture Material
    </h2>

    {#if lectureMaterial}
      <div class="flex flex-col gap-4">
        <div class="flex h-fit min-h-40 flex-col justify-center px-4 pt-2 pb-8">
          <iframe
            src={`https://www.youtube.com/embed/${lectureMaterial.ytVideoId}`}
            title={lectureMaterial.title}
            class="block aspect-video w-full max-w-4xl self-center"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <form action="?/updateLectureMaterial" method="post">
          <fieldset class="hidden pb-2 md:flex-row">
            <label
              for="lecture-material-id"
              class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
            >
              ID:
            </label>
            <input
              name="lecture-material-id"
              id="lecture-material-id"
              type="text"
              readonly
              bind:value={lectureMaterial.id}
              class="font-nunito w-full rounded-xs border-0 p-0 text-gray-700 transition-all duration-100"
            />
          </fieldset>
          <fieldset class="hidden pb-2 md:flex-row">
            <label
              for="lecture-material-topic-id"
              class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
            >
              From Topic:
            </label>
            <input
              name="lecture-material-topic-id"
              id="lecture-material-topic-id"
              type="text"
              readonly
              bind:value={lectureMaterial.topicId}
              class="font-nunito w-full rounded-xs border-0 p-0 text-gray-700 transition-all duration-100"
            />
          </fieldset>
          <fieldset class="flex flex-col pb-2 md:flex-row">
            <label
              for="lecture-material-yt-video-id"
              class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
            >
              Video ID:
            </label>
            <input
              name="lecture-material-yt-video-id"
              id="lecture-material-yt-video-id"
              type="text"
              maxlength="255"
              bind:value={lectureMaterial.ytVideoId}
              class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 transition-all duration-100"
            />
          </fieldset>
          <fieldset class="flex flex-col pb-2 md:flex-row">
            <label
              for="lecture-material-title"
              class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
            >
              Title:
            </label>
            <input
              name="lecture-material-title"
              id="lecture-material-title"
              type="text"
              maxlength="255"
              bind:value={lectureMaterial.title}
              class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 transition-all duration-100"
            />
          </fieldset>
          <fieldset class="flex flex-col pb-2 md:flex-row">
            <label
              for="lecture-material-description"
              class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
            >
              Description:
            </label>
            <textarea
              id="lecture-material-description"
              name="lecture-material-description"
              class="font-nunito inline-block field-sizing-fixed min-h-20 w-full resize-y rounded-xs border-1 border-gray-200 p-1 text-gray-700"
              >{lectureMaterial.description.trim()}</textarea
            >
          </fieldset>
          <fieldset class="flex flex-row justify-end gap-4">
            <p class="text-cdm-red-600 font-nunito inline-block py-2 pr-2">
              {#if form?.lectureMaterialMessage}
                {form?.lectureMaterialMessage ?? ''}
              {/if}
            </p>
            <button
              type="submit"
              class="font-poppins border-cdm-blue-900 text-cdm-blue-900 hover:bg-cdm-blue-900 active:bg-cdm-blue-950 active:border-cdm-blue-950 rounded-md border-2 bg-white px-4 py-2 text-sm font-semibold transition-all duration-100 hover:text-white active:text-white lg:text-base xl:text-center"
              >Update Lecture Material</button
            >
            <button
              formaction="?/deleteLectureMaterial"
              class="font-poppins border-cdm-red-700 text-cdm-red-700 hover:bg-cdm-red-700 active:bg-cdm-red-800 active:border-cdm-red-800 rounded-md border-2 bg-white px-4 py-2 text-sm font-semibold transition-all duration-100 hover:text-white active:text-white lg:text-base xl:text-center"
              >Delete Lecture Material</button
            >
          </fieldset>
        </form>
      </div>
    {:else}
      <p
        class="font-nunito inline-block h-full w-full rounded-sm p-2 text-sm transition-all duration-100 sm:text-base lg:text-lg"
      >
        No lecture material yet...
      </p>
      <div
        class="max-md:relative max-md:inset-0 max-md:flex max-md:grow max-md:flex-col md:col-span-2"
      >
        <button
          class={[
            addLectureMaterialPanelVisible ? 'hidden' : 'block',
            'font-poppins border-cdm-blue-900 text-cdm-blue-900 hover:bg-cdm-blue-900 active:bg-cdm-blue-950 active:border-cdm-blue-950 rounded-md border-2 bg-white px-4 py-2 text-sm font-semibold transition-all duration-100 hover:text-white active:text-white md:ml-auto lg:text-base xl:text-center',
          ]}
          onclick={() =>
            (addLectureMaterialPanelVisible = !addLectureMaterialPanelVisible)}
        >
          Add Lecture Material
        </button>
        <div
          class={[
            addLectureMaterialPanelVisible ? 'fixed' : 'hidden',
            'inset-0 flex h-full w-full flex-col bg-[#00000040] p-4 md:justify-center md:align-middle',
          ]}
        >
          <form
            method="post"
            action="?/addLectureMaterial"
            class="mx-auto flex w-full max-w-4xl min-w-sm flex-col rounded-md bg-white p-4 drop-shadow-md max-md:h-full md:h-fit"
          >
            <div class="flex flex-row justify-between pb-2">
              <h1
                class="font-poppins 2xs:text-base text-cdm-blue-950 w-fit pb-2 text-sm font-semibold transition-all duration-100 sm:text-lg lg:text-xl"
              >
                Add a lecture material
              </h1>
              <button
                type="button"
                class={[addLectureMaterialPanelVisible ? 'block' : 'hidden']}
                onclick={() =>
                  (addLectureMaterialPanelVisible =
                    !addLectureMaterialPanelVisible)}
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
                for="insert-lecture-material-topic-id"
                class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
              >
                Topic ID:
              </label>
              <input
                readonly
                name="insert-lecture-material-topic-id"
                id="insert-lecture-material-topic-id"
                type="text"
                bind:value={topic.id}
                class="font-nunito w-full rounded-xs border-0 border-gray-200 p-0 text-gray-700 transition-all duration-100"
              />
            </fieldset>
            <fieldset class="flex flex-col pb-2 md:flex-row">
              <label
                for="insert-lecture-material-title"
                class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
              >
                Title:
              </label>
              <input
                name="insert-lecture-material-title"
                id="insert-lecture-material-title"
                type="text"
                maxlength="255"
                placeholder="Lecture Material Title"
                class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 transition-all duration-100"
              />
            </fieldset>
            <fieldset class="flex flex-col pb-2 md:flex-row">
              <label
                for="insert-lecture-material-yt-video-id"
                class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
              >
                Video ID:
              </label>
              <input
                name="insert-lecture-material-yt-video-id"
                id="insert-lecture-material-yt-video-id"
                type="text"
                maxlength="11"
                placeholder="YouTube Video ID"
                class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 transition-all duration-100"
              />
            </fieldset>
            <fieldset class="flex flex-col pb-2 md:flex-row">
              <label
                for="insert-lecture-material-description"
                class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
              >
                Description:
              </label>
              <textarea
                id="insert-lecture-material-description"
                name="insert-lecture-material-description"
                placeholder="Describe the coverage of the lecture material."
                class="font-nunito inline-block field-sizing-fixed min-h-20 w-full resize-y rounded-xs border-1 border-gray-200 p-1 text-gray-700"
              ></textarea>
            </fieldset>
            <fieldset class="flex flex-row justify-end gap-4">
              <p class="text-cdm-red-600 font-nunito inline-block py-2 pr-2">
                {#if form?.insertLectureMaterialMessage}
                  {form?.insertLectureMaterialMessage ?? ''}
                {/if}
              </p>
              <button
                type="submit"
                class="font-poppins border-cdm-blue-900 text-cdm-blue-900 hover:bg-cdm-blue-900 active:bg-cdm-blue-950 active:border-cdm-blue-950 rounded-md border-2 bg-white px-4 py-2 text-sm font-semibold transition-all duration-100 hover:text-white active:text-white lg:text-base xl:text-center"
                >Add Lecture Material</button
              >
            </fieldset>
          </form>
        </div>
      </div>
    {/if}
  </section>
  <section class="flex flex-col gap-2 transition-all duration-100">
    <h2
      class="font-poppins 2xs:text-xl text-cdm-blue-950 w-fit pb-2 text-lg font-semibold transition-all duration-100 sm:text-[1.375rem] lg:text-2xl"
    >
      Check-up Quiz
    </h2>
    {#if quizQuestions}
      <div class="flex flex-col">
        <ol class="flex list-inside list-decimal flex-col gap-2">
          {#each quizQuestions as question (question.id)}
            <div class="flex flex-col gap-2 rounded-sm bg-gray-50 p-2">
              <li class="font-nunito font-medium">{question.content}</li>
              <ul class="pl-4">
                <li
                  class={[
                    'font-nunito',
                    question.correctAnswer === 'A'
                      ? 'text-green-600'
                      : 'text-gray-800',
                  ]}
                >
                  A.&nbsp;&nbsp;{question.optionA}
                </li>
                <li
                  class={[
                    'font-nunito',
                    question.correctAnswer === 'B'
                      ? 'text-green-600'
                      : 'text-gray-800',
                  ]}
                >
                  B.&nbsp;&nbsp;{question.optionB}
                </li>
                <li
                  class={[
                    'font-nunito',
                    question.correctAnswer === 'C'
                      ? 'text-green-600'
                      : 'text-gray-800',
                  ]}
                >
                  C.&nbsp;&nbsp;{question.optionC}
                </li>
                <li
                  class={[
                    'font-nunito',
                    question.correctAnswer === 'D'
                      ? 'text-green-600'
                      : 'text-gray-800',
                  ]}
                >
                  D.&nbsp;&nbsp;{question.optionD}
                </li>
              </ul>
            </div>
          {/each}
        </ol>
      </div>
    {:else}
      <p
        class="font-nunito inline-block h-full w-full rounded-sm p-2 text-sm transition-all duration-100 sm:text-base lg:text-lg"
      >
        No quiz yet...
      </p>
    {/if}
  </section>
</section>
