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

  let lesson = $state(data.lesson);
  let addTopicPanelVisible = $state(false);
</script>

<svelte:head>
  <title>Edit Lesson | CDM Nexus Tutors</title>
  <meta
    name="description"
    content="Lesson editing page for CDM Nexus Tutors."
  />
</svelte:head>

<Wrapper>
  <MainPanel
    heading="Edit lesson"
    subheading="Modify or delete lesson details."
    src="https://picsum.photos/seed/cdm/1440/200/?blur=10"
  >
    <section class="flex w-full flex-col justify-start gap-4 p-2 pb-4">
      <section class="pb-2">
        <h2
          class="font-poppins 2xs:text-xl w-fit pb-2 text-lg font-semibold text-blue-900 transition-all duration-100 sm:text-[1.375rem] lg:text-2xl"
        >
          {lesson.title}
        </h2>
        <div class="flex flex-row pb-2">
          <p
            class="font-nunito inline-block pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
          >
            Last Modified:
          </p>
          <p class="font-nunito text-gray-700">
            {lesson.dateModified.toLocaleDateString(navigator.language, {
              dateStyle: 'medium',
            })}
          </p>
        </div>
        <form class="flex flex-col" method="post" action="?/updateLesson">
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
            <p class="font-nunito inline-block py-2 pr-2 text-red-600">
              {#if form?.updateLessonMessage}
                {form?.updateLessonMessage ?? ''}
              {/if}
            </p>
            <Button variant="primary" class={{ span: 'text-sm md:text-base' }}>
              Update Lesson
            </Button>
            <Button
              variant="destructive"
              formaction="?/deleteLesson"
              class={{ span: 'text-sm md:text-base' }}
            >
              Delete Lesson
            </Button>
          </fieldset>
        </form>
      </section>
      <Separator orientation="horizontal" />
      <section class="flex flex-col gap-2 transition-all duration-100">
        <div class="flex flex-row items-center justify-between">
          <h2
            class="font-poppins 2xs:text-xl w-fit pb-2 text-lg font-semibold text-blue-900 transition-all duration-100 sm:text-[1.375rem] lg:text-2xl"
          >
            Topics
          </h2>
          <Button
            variant="primary"
            onclick={() => (addTopicPanelVisible = !addTopicPanelVisible)}
            class={{ span: 'text-sm md:text-base' }}
          >
            Add Topic
          </Button>
        </div>
        <ul
          class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {#if data.topics[0]}
            {#each data.topics as topic (topic.id)}
              <li>
                <Button
                  variant="outline"
                  href={`${lesson.slug}/${topic.slug}`}
                  class={{
                    button: 'h-full w-full',
                    span: 'text-left text-sm font-normal md:text-base',
                  }}
                >
                  {topic.title}
                </Button>
              </li>
            {/each}
          {:else}
            <li
              class="font-nunito inline-block h-full w-full rounded-sm p-2 text-sm transition-all duration-100 sm:text-base lg:text-lg"
            >
              No topics yet...
            </li>
          {/if}
        </ul>
      </section>
    </section>
  </MainPanel>
  <SidePanel duration={200}>
    <Calendar />
  </SidePanel>
</Wrapper>

<div
  class={[
    addTopicPanelVisible ? 'fixed' : 'hidden',
    'inset-0 z-100 flex h-full w-full flex-col justify-center bg-[#00000040] p-4 align-middle',
  ]}
>
  <form
    method="post"
    action="?/addTopic"
    use:enhance
    class="mx-auto flex h-fit w-full max-w-4xl flex-col rounded-md bg-white p-4 drop-shadow-md"
  >
    <div class="flex flex-row justify-between pb-2">
      <h1
        class="font-poppins 2xs:text-base w-fit pb-2 text-sm font-semibold text-blue-900 transition-all duration-100 sm:text-lg lg:text-xl"
      >
        Add a topic
      </h1>
      <button
        type="button"
        class="font-poppins inline-flex max-h-fit min-h-fit max-w-fit min-w-fit flex-row justify-start gap-3 overflow-clip rounded-md border-0 bg-white p-1 text-center align-middle font-medium text-balance text-gray-800 outline-transparent transition-colors duration-100 hover:cursor-pointer not-disabled:hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400/50 active:scale-[0.98] not-disabled:active:bg-red-200 not-disabled:active:text-red-950 disabled:cursor-not-allowed disabled:opacity-50"
        onclick={() => (addTopicPanelVisible = !addTopicPanelVisible)}
      >
        <X class="size-6" weight="bold" />
      </button>
    </div>
    <fieldset class="flex flex-col pb-2 md:flex-row">
      <label
        for="topic-lesson-id"
        class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
      >
        Lesson ID:
      </label>
      <input
        readonly
        name="topic-lesson-id"
        id="topic-lesson-id"
        type="text"
        bind:value={lesson.id}
        class="font-nunito w-full rounded-xs border-0 border-gray-200 p-0 text-gray-700 transition-all duration-100"
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
        placeholder="Topic Title"
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
        placeholder="Describe the coverage of the topic."
        class="font-nunito inline-block field-sizing-fixed min-h-20 w-full resize-y rounded-xs border-1 border-gray-200 p-1 text-gray-700"
      ></textarea>
    </fieldset>
    <fieldset class="flex flex-row justify-end gap-4">
      <p class="font-nunito inline-block py-2 pr-2 text-red-600">
        {#if form?.addTopicMessage}
          {form?.addTopicMessage ?? ''}
        {/if}
      </p>
      <Button
        variant="primary"
        type="submit"
        class={{ span: 'text-sm md:text-base' }}
      >
        Add Topic
      </Button>
    </fieldset>
  </form>
</div>
