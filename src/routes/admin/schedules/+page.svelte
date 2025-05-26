<script lang="ts">
  import type { PageProps } from './$types';

  import Calendar from '$lib/components/ui/Calendar.svelte';

  import MainPanel from '$lib/components/routes/admin-tutor/MainPanel.svelte';
  import SidePanel from '$lib/components/routes/admin-tutor/SidePanel.svelte';
  import Wrapper from '$lib/components/routes/admin-tutor/Wrapper.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { enhance } from '$app/forms';
  import Separator from '$lib/components/ui/Separator.svelte';
  import X from 'phosphor-svelte/lib/X';

  let { data, form }: PageProps = $props();

  let availabilities = $state(data.availabilities);
  let sessions = $state(data.sessions);
  let tutors = $state(data.tutors);

  let selectedTutorId: string | undefined = $state(undefined);

  let filteredAvailabilites = $derived.by(() => {
    let result;

    if (selectedTutorId) {
      result = availabilities.filter((a) => {
        return a.tutorId === selectedTutorId;
      });
    } else {
      result = availabilities;
    }

    return result;
  });

  let filteredSessions = $derived.by(() => {
    let result;

    if (selectedTutorId) {
      result = sessions.filter((s) => {
        return s.tutorId == selectedTutorId;
      });
    } else {
      result = sessions;
    }

    return result;
  });

  let addTutoringSessionPanelVisible = $state(false);
</script>

<svelte:head>
  <title>Manage Schedules | CDM Nexus Admins</title>
  <meta
    name="description"
    content="Scheduling portal for CDM Nexus Administrators."
  />
</svelte:head>

<Wrapper>
  <MainPanel
    heading="Manage tutoring schedules"
    subheading="Add, modify, or delete scheduled tutoring sessions."
    src="https://picsum.photos/seed/cdm/1440/200/?blur=10"
  >
    <div class="grid grid-cols-1 md:grid-cols-2">
      <section
        class="flex w-full flex-col justify-start gap-2 p-2 pb-4 md:order-2"
      >
        <div class="flex flex-row items-center justify-between">
          <h2
            class="font-poppins w-fit pr-8 text-xl font-semibold text-gray-800 transition-all duration-100 md:text-2xl"
          >
            Tutoring Sessions
          </h2>
          <Button
            variant="primary"
            onclick={() =>
              (addTutoringSessionPanelVisible =
                !addTutoringSessionPanelVisible)}
            class={{ span: 'text-sm md:text-base' }}
          >
            Add Session
          </Button>
        </div>
        <section class="grid grid-cols-1 gap-2 pt-4">
          <div
            class="flex flex-col justify-start gap-3 rounded-md border border-gray-100 bg-gray-50 px-3 py-4"
          >
            <div class="flex flex-row justify-start">
              <Button
                variant="underline"
                class={{
                  button: 'text-left text-lg font-semibold md:text-xl',
                }}
                tabindex={-1}
              >
                Sessions
              </Button>
            </div>
            <div class="flex grow flex-col justify-between gap-4">
              <div class="flex grow flex-col gap-1">
                {#if data.sessions.length >= 1}
                  {#each data.sessions as session (session.id)}
                    <form
                      method="post"
                      action="?/deleteSession"
                      use:enhance
                      class="font-poppins inline-flex min-h-fit min-w-fit flex-row justify-between gap-3 overflow-clip rounded-md border-1 border-gray-100 bg-white px-3 py-2 text-left align-middle font-medium text-balance text-gray-800 outline-transparent drop-shadow-xs transition-colors duration-100 select-none focus-within:outline-gray-400/50 hover:cursor-pointer not-disabled:hover:border-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.99] not-disabled:active:border-gray-300 not-disabled:active:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <div class="flex flex-col justify-start gap-0.5">
                        <p
                          class="font-poppins text-2xs flex w-full min-w-fit flex-row border-0 p-0 leading-tight text-gray-800/50 outline-0"
                        >
                          {session.id}
                        </p>
                        <input
                          type="text"
                          id="session-id"
                          name="session-id"
                          value={session.id}
                          class="font-poppins text-2xs hidden w-full min-w-fit flex-row border-0 p-0 leading-tight text-gray-800/50 outline-0"
                        />
                        <div class="flex flex-col">
                          <h2 class="font-poppins text-lg font-medium">
                            {session.name}
                          </h2>
                          <div class="flex flex-row gap-1">
                            <p class="font-nunito leading-tight font-normal">
                              <span class="font-medium"> Start: </span>
                              {session.startTime.toLocaleDateString(
                                navigator.language,
                                {
                                  weekday: 'long',
                                  month: 'long',
                                  day: 'numeric',
                                }
                              ) +
                                ', ' +
                                session.startTime.toLocaleTimeString(
                                  navigator.language,
                                  {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                  }
                                )}
                            </p>
                            <Separator orientation="vertical" />
                            <p
                              class="font-nunito pl-1 leading-tight font-normal"
                            >
                              <span class="font-medium"> End: </span>
                              {session.endTime.toLocaleDateString(
                                navigator.language,
                                {
                                  weekday: 'long',
                                  month: 'long',
                                  day: 'numeric',
                                }
                              ) +
                                ', ' +
                                session.endTime.toLocaleTimeString(
                                  navigator.language,
                                  {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                  }
                                )}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-col justify-center">
                        <button
                          type="submit"
                          class="font-poppins inline-flex max-h-fit min-h-fit max-w-fit min-w-fit flex-row justify-start gap-3 overflow-clip rounded-md border-0 bg-white p-1 text-center align-middle font-medium text-balance text-gray-800 outline-transparent transition-colors duration-100 hover:cursor-pointer not-disabled:hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400/50 active:scale-[0.98] not-disabled:active:bg-red-200 not-disabled:active:text-red-950 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <X class="size-6" weight="bold" />
                        </button>
                      </div>
                    </form>
                  {/each}
                {:else}
                  <p class="font-poppins px-2 py-1 text-base font-normal">
                    No sessions yet...
                  </p>
                {/if}
              </div>
            </div>
          </div>
        </section>
      </section>
      <section
        class="flex w-full flex-col justify-start gap-2 p-2 pb-4 md:order-1"
      >
        <div class="flex flex-col justify-center">
          <h2
            class="font-poppins flex min-h-10 w-fit flex-col justify-center text-xl leading-none font-semibold text-gray-800 transition-all duration-100 md:text-2xl"
          >
            Available Tutor Timeslots
          </h2>
        </div>
        <section class="grid grid-cols-1 gap-2 pt-4">
          <div
            class="flex flex-col justify-start gap-3 rounded-md border border-gray-100 bg-gray-50 px-3 py-4"
          >
            <div class="flex flex-row justify-between gap-8">
              <Button
                variant="underline"
                class={{
                  button: 'text-left text-lg font-semibold md:text-xl',
                }}
                tabindex={-1}
              >
                Timeslots
              </Button>
              <select
                name="tutor-filter"
                id="tutor-filter"
                class="font-poppins inline-flex w-full min-w-fit items-center justify-center rounded-md border-0 bg-white text-base font-medium text-gray-800 outline-transparent transition-colors duration-100 hover:text-blue-950 focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950/50 active:text-blue-950"
                bind:value={selectedTutorId}
              >
                <option value="">All</option>
                {#each tutors as tutor}
                  <option value={tutor.id}>{tutor.fullName}</option>
                {/each}
              </select>
            </div>
            <div class="flex grow flex-col justify-between gap-4">
              <div class="flex grow flex-col gap-1">
                {#if filteredAvailabilites.length >= 1}
                  {#each filteredAvailabilites as availabilities (availabilities.id)}
                    <div
                      class="font-poppins inline-flex min-h-fit min-w-fit flex-row justify-between gap-3 overflow-clip rounded-md border-1 border-gray-100 bg-white px-3 py-2 text-left align-middle font-medium text-balance text-gray-800 outline-transparent drop-shadow-xs transition-colors duration-100 select-none focus-within:outline-gray-400/50 hover:cursor-pointer not-disabled:hover:border-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.99] not-disabled:active:border-gray-300 not-disabled:active:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <div class="flex flex-col justify-start gap-0.5">
                        <p
                          class="font-poppins text-2xs flex w-full min-w-fit flex-row border-0 p-0 leading-tight text-gray-800/50 outline-0"
                        >
                          {availabilities.id}
                        </p>
                        <div class="flex flex-col">
                          <h2 class="font-poppins text-lg font-medium">
                            {availabilities.name} |
                            {availabilities.dayOfWeek === 0
                              ? 'Sunday'
                              : availabilities.dayOfWeek === 1
                                ? 'Monday'
                                : availabilities.dayOfWeek === 2
                                  ? 'Tuesday'
                                  : availabilities.dayOfWeek === 3
                                    ? 'Wednesday'
                                    : availabilities.dayOfWeek === 4
                                      ? 'Thursday'
                                      : availabilities.dayOfWeek === 5
                                        ? 'Friday'
                                        : availabilities.dayOfWeek === 6
                                          ? 'Saturday'
                                          : ''}
                          </h2>
                          <div class="flex flex-row gap-1">
                            <p class="font-nunito leading-tight font-normal">
                              <span class="font-medium"> Start: </span>
                              {availabilities.startTime}
                            </p>
                            <Separator orientation="vertical" />
                            <p
                              class="font-nunito pl-1 leading-tight font-normal"
                            >
                              <span class="font-medium"> End: </span>
                              {availabilities.endTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  {/each}
                {:else}
                  <p class="font-poppins px-2 py-1 text-base font-normal">
                    No tutor availabilities yet...
                  </p>
                {/if}
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  </MainPanel>
  <SidePanel duration={200}>
    <Calendar />
  </SidePanel>
</Wrapper>

<div
  class={[
    addTutoringSessionPanelVisible ? 'fixed' : 'hidden',
    'inset-0 z-100 flex h-full w-full flex-col justify-center bg-[#00000040] p-4 align-middle',
  ]}
>
  <form
    method="post"
    action="?/addSession"
    use:enhance
    class="mx-auto flex h-fit w-full max-w-2xl flex-col rounded-md bg-white p-4 drop-shadow-md"
  >
    <div class="flex flex-row justify-between pb-2">
      <h1
        class="font-poppins w-fit pr-8 pb-2 text-xl font-semibold text-blue-900 transition-all duration-100"
      >
        Set a tutoring session:
      </h1>
      <button
        type="button"
        class="font-poppins inline-flex max-h-fit min-h-fit max-w-fit min-w-fit flex-row justify-start gap-3 overflow-clip rounded-md border-0 bg-white p-1 text-center align-middle font-medium text-balance text-gray-800 outline-transparent transition-colors duration-100 hover:cursor-pointer not-disabled:hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400/50 active:scale-[0.98] not-disabled:active:bg-red-200 not-disabled:active:text-red-950 disabled:cursor-not-allowed disabled:opacity-50"
        onclick={() =>
          (addTutoringSessionPanelVisible = !addTutoringSessionPanelVisible)}
      >
        <X class="size-6" weight="bold" />
      </button>
    </div>
    <fieldset class="flex flex-col pb-2 md:flex-row">
      <label
        for="tutor-id"
        class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
      >
        Tutor:
      </label>
      <select
        name="tutor-id"
        id="tutor-id"
        class="font-poppins inline-flex w-full min-w-fit items-center justify-center rounded-md border-1 border-gray-200 bg-white text-base font-medium text-gray-800 outline-transparent transition-colors duration-100 hover:text-blue-950 focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950/50 active:text-blue-950"
        bind:value={selectedTutorId}
      >
        {#each tutors as tutor}
          <option value={tutor.id}>{tutor.fullName}</option>
        {/each}
      </select>
    </fieldset>
    <fieldset class="flex flex-col pb-2 md:flex-row">
      <label
        for="start-time"
        class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
      >
        Start time:
      </label>
      <input
        type="datetime-local"
        name="start-time"
        id="start-time"
        min={new Date().toISOString().slice(0, -8)}
        class="font-nunito w-full rounded-md border-1 border-gray-200 p-2 text-gray-700 transition-all duration-100"
      />
    </fieldset>
    <fieldset class="flex flex-col pb-2 md:flex-row">
      <label
        for="end-time"
        class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
      >
        End time:
      </label>
      <input
        type="datetime-local"
        name="end-time"
        id="end-time"
        min={new Date(Date.now() + 1000 * 60 * 60 * 1)
          .toISOString()
          .slice(0, -8)}
        class="font-nunito w-full rounded-md border-1 border-gray-200 p-2 text-gray-700 transition-all duration-100"
      />
    </fieldset>
    <fieldset class="flex flex-row justify-end gap-4">
      <p class="font-nunito inline-block py-2 pr-2 text-red-600">
        {#if form?.addAvailabilityMessage}
          {form?.addAvailabilityMessage ?? ''}
        {/if}
      </p>
      <Button
        variant="primary"
        type="submit"
        class={{ span: 'text-sm md:text-base' }}
      >
        Add Availability
      </Button>
    </fieldset>
  </form>
</div>
