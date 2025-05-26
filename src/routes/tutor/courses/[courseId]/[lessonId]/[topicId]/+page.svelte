<script lang="ts">
  import type { PageProps } from './$types';

  import Calendar from '$lib/components/ui/Calendar.svelte';

  import MainPanel from '$lib/components/routes/admin-tutor/MainPanel.svelte';
  import SidePanel from '$lib/components/routes/admin-tutor/SidePanel.svelte';
  import Wrapper from '$lib/components/routes/admin-tutor/Wrapper.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Separator from '$lib/components/ui/Separator.svelte';
  import X from 'phosphor-svelte/lib/X';
  import RadioGroup from '$lib/components/ui/RadioGroup.svelte';

  let { data, form }: PageProps = $props();

  let topic = $state(data.topic);
  let lectureMaterial = $state(data.lectureMaterial);
  let quizQuestions = $state(data.quizQuestions);

  let addLectureMaterialPanelVisible = $state(false);
</script>

<svelte:head>
  <title>Edit Topic | CDM Nexus Tutors</title>
  <meta name="description" content="Topic editing page for CDM Nexus Tutors." />
</svelte:head>

<Wrapper>
  <MainPanel
    heading="Edit topic"
    subheading="Modify or delete topic details."
    src="https://picsum.photos/seed/cdm/1440/200/?blur=10"
  >
    <section class="flex w-full flex-col justify-start gap-4 p-2 pb-4">
      <section class="pb-2">
        <h2
          class="font-poppins 2xs:text-xl w-fit pb-2 text-lg font-semibold text-blue-900 transition-all duration-100 sm:text-[1.375rem] lg:text-2xl"
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
        <form class="flex flex-col" method="post" action="?/updateTopic">
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
            <p class="font-nunito inline-block py-2 pr-2 text-red-600">
              {#if form?.updateTopicMessage}
                {form?.updateTopicMessage ?? ''}
              {/if}
            </p>
            <Button variant="primary" class={{ span: 'text-sm md:text-base' }}>
              Update Topic
            </Button>
            <Button
              variant="destructive"
              formaction="?/deleteTopic"
              class={{ span: 'text-sm md:text-base' }}
            >
              Delete Topic
            </Button>
          </fieldset>
        </form>
      </section>
      <Separator orientation="horizontal" />
      <section
        class="flex min-h-fit flex-col gap-2 pb-4 transition-all duration-100"
      >
        <div class="flex flex-row items-center justify-between">
          <h2
            class="font-poppins 2xs:text-xl w-fit pb-2 text-lg font-semibold text-blue-900 transition-all duration-100 sm:text-[1.375rem] lg:text-2xl"
          >
            Lecture Material
          </h2>
          <div class={['contents', data.lectureMaterial ? 'hidden' : 'block']}>
            <Button
              variant="primary"
              onclick={() =>
                (addLectureMaterialPanelVisible =
                  !addLectureMaterialPanelVisible)}
              class={{
                span: 'text-sm md:text-base',
              }}
            >
              Add Lecture Material
            </Button>
          </div>
        </div>
        {#if lectureMaterial}
          <div class="flex flex-col gap-4">
            <div
              class="flex h-fit min-h-40 flex-col justify-center px-4 pt-2 pb-8"
            >
              <iframe
                src={`https://www.youtube.com/embed/${lectureMaterial.ytVideoId}`}
                title={lectureMaterial.title}
                class="block aspect-video w-full max-w-2xl self-center rounded-lg"
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
                <p class="font-nunito inline-block py-2 pr-2 text-red-600">
                  {#if form?.updateLectureMaterialMessage}
                    {form?.updateLectureMaterialMessage ?? ''}
                  {/if}
                </p>
                <Button
                  type="submit"
                  variant="primary"
                  class={{ span: 'text-sm md:text-base' }}
                >
                  Update Lecture Material
                </Button>
                <Button
                  variant="destructive"
                  formaction="?/deleteLectureMaterial"
                  class={{ span: 'text-sm md:text-base' }}
                >
                  Delete Lecture Material
                </Button>
              </fieldset>
            </form>
          </div>
        {:else}
          <p
            class="font-nunito inline-block h-full w-full rounded-sm p-2 text-sm transition-all duration-100 sm:text-base lg:text-lg"
          >
            No lecture material yet...
          </p>
        {/if}
      </section>
      <section class="flex flex-col gap-2 transition-all duration-100">
        <h2
          class="font-poppins 2xs:text-xl w-fit pb-2 text-lg font-semibold text-blue-900 transition-all duration-100 sm:text-[1.375rem] lg:text-2xl"
        >
          Check-up Quiz
        </h2>
        {#if quizQuestions}
          <div class="flex flex-col">
            <ol class="flex list-inside list-decimal flex-col gap-2">
              {#each quizQuestions as question (question.id)}
                <div
                  class="flex flex-col gap-2 rounded-md border border-gray-100 bg-white p-4 drop-shadow-xs"
                >
                  <li class="font-poppins font-normal">{question.content}</li>
                  <RadioGroup
                    bind:value={question.answer}
                    items={[
                      {
                        label: question.optionA,
                        value: 'A',
                      },
                      {
                        label: question.optionB,
                        value: 'B',
                      },
                      {
                        label: question.optionC,
                        value: 'C',
                      },
                      {
                        label: question.optionD,
                        value: 'D',
                      },
                    ]}
                  />
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
  </MainPanel>
  <SidePanel duration={200}>
    <Calendar />
  </SidePanel>
</Wrapper>

<div
  class={[
    addLectureMaterialPanelVisible ? 'fixed' : 'hidden',
    'inset-0 z-100 flex h-full w-full flex-col justify-center bg-[#00000040] p-4 align-middle',
  ]}
>
  <form
    method="post"
    action="?/addLectureMaterial"
    class="mx-auto flex h-fit w-full max-w-4xl flex-col rounded-md bg-white p-4 drop-shadow-md"
  >
    <div class="flex flex-row justify-between pb-2">
      <h1
        class="font-poppins 2xs:text-base w-fit pb-2 text-sm font-semibold text-blue-900 transition-all duration-100 sm:text-lg lg:text-xl"
      >
        Add a lecture material
      </h1>
      <button
        type="button"
        class="font-poppins inline-flex max-h-fit min-h-fit max-w-fit min-w-fit flex-row justify-start gap-3 overflow-clip rounded-md border-0 bg-white p-1 text-center align-middle font-medium text-balance text-gray-800 outline-transparent transition-colors duration-100 hover:cursor-pointer not-disabled:hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400/50 active:scale-[0.98] not-disabled:active:bg-red-200 not-disabled:active:text-red-950 disabled:cursor-not-allowed disabled:opacity-50"
        onclick={() =>
          (addLectureMaterialPanelVisible = !addLectureMaterialPanelVisible)}
      >
        <X class="size-6" weight="bold" />
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
      <p class="font-nunito inline-block py-2 pr-2 text-red-600">
        {#if form?.addLectureMaterialMessage}
          {form?.addLectureMaterialMessage ?? ''}
        {/if}
      </p>
      <Button
        variant="primary"
        type="submit"
        class={{ span: 'text-sm md:text-base' }}
      >
        Add Lecture Material
      </Button>
    </fieldset>
  </form>
</div>
