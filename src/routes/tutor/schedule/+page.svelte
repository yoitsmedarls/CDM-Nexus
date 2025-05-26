<script lang="ts">
  import type { PageProps } from './$types';

  import Calendar from '$lib/components/ui/Calendar.svelte';

  import MainPanel from '$lib/components/routes/admin-tutor/MainPanel.svelte';
  import SidePanel from '$lib/components/routes/admin-tutor/SidePanel.svelte';
  import Wrapper from '$lib/components/routes/admin-tutor/Wrapper.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { enhance } from '$app/forms';
  import X from 'phosphor-svelte/lib/X';
  import Separator from '$lib/components/ui/Separator.svelte';

  let { data, form }: PageProps = $props();

  let addAvailabilityPanelVisible = $state(false);

  let startTime: string | number | undefined = $state('09:00');
  let endTime: string | number | undefined = $state('10:00');
</script>

<svelte:head>
  <title>My Schedule | CDM Nexus Tutors</title>
  <meta
    name="description"
    content="Tutor schedule management page for CDM Nexus Tutors."
  />
</svelte:head>

<Wrapper>
  <MainPanel
    heading="Manage your schedule"
    subheading="Specify your tutoring availability."
    src="https://picsum.photos/seed/cdm/1440/200/?blur=10"
  >
    <section class="flex w-full flex-col justify-start gap-2 p-2 pb-4">
      <div class="flex flex-row items-center justify-between">
        <h2
          class="font-poppins w-fit pr-4 text-xl font-semibold text-gray-800 transition-all duration-100 md:text-2xl"
        >
          My Availability
        </h2>
        <Button
          variant="primary"
          onclick={() =>
            (addAvailabilityPanelVisible = !addAvailabilityPanelVisible)}
          class={{ span: 'text-sm md:text-base' }}
        >
          Add Availability
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
              Timeslots
            </Button>
          </div>
          <div class="flex grow flex-col justify-between gap-4">
            <div class="flex grow flex-col gap-1">
              {#if data.availability.length >= 1}
                {#each data.availability as availability (availability.id)}
                  <form
                    method="post"
                    action="?/deleteAvailability"
                    use:enhance
                    class="font-poppins inline-flex min-h-fit min-w-fit flex-row justify-between gap-3 overflow-clip rounded-md border-1 border-gray-100 bg-white px-3 py-2 text-left align-middle font-medium text-balance text-gray-800 outline-transparent drop-shadow-xs transition-colors duration-100 select-none focus-within:outline-gray-400/50 hover:cursor-pointer not-disabled:hover:border-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.99] not-disabled:active:border-gray-300 not-disabled:active:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <div class="flex flex-col justify-start gap-0.5">
                      <p
                        class="font-poppins text-2xs flex w-full min-w-fit flex-row border-0 p-0 leading-tight text-gray-800/50 outline-0"
                      >
                        {availability.id}
                      </p>
                      <input
                        type="text"
                        id="availability-id"
                        name="availability-id"
                        value={availability.id}
                        class="font-poppins text-2xs hidden w-full min-w-fit flex-row border-0 p-0 leading-tight text-gray-800/50 outline-0"
                      />
                      <div class="flex flex-col">
                        <h2 class="font-poppins text-lg font-medium">
                          Available on
                          {availability.dayOfWeek === 0
                            ? 'Sunday'
                            : availability.dayOfWeek === 1
                              ? 'Monday'
                              : availability.dayOfWeek === 2
                                ? 'Tuesday'
                                : availability.dayOfWeek === 3
                                  ? 'Wednesday'
                                  : availability.dayOfWeek === 4
                                    ? 'Thursday'
                                    : availability.dayOfWeek === 5
                                      ? 'Friday'
                                      : availability.dayOfWeek === 6
                                        ? 'Saturday'
                                        : ''}
                        </h2>
                        <div class="flex flex-row gap-1">
                          <p class="font-nunito leading-tight font-normal">
                            <span class="font-medium"> Start: </span>
                            {availability.startTime}
                          </p>
                          <Separator orientation="vertical" />
                          <p class="font-nunito pl-1 leading-tight font-normal">
                            <span class="font-medium"> End: </span>
                            {availability.endTime}
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
                  No availability specified...
                </p>
              {/if}
            </div>
          </div>
        </div>
      </section>
    </section>
    <section class="flex w-full flex-col justify-start gap-2 p-2 pb-4">
      <div class="flex flex-row items-center justify-between">
        <h2
          class="font-poppins w-fit text-xl font-semibold text-gray-800 transition-all duration-100 md:text-2xl"
        >
          Assigned Tutoring Sessions
        </h2>
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
                {#each data.sessions as sessions (sessions.id)}
                  <div
                    class="font-poppins inline-flex min-h-fit min-w-fit flex-row justify-between gap-3 overflow-clip rounded-md border-1 border-gray-100 bg-white px-3 py-2 text-left align-middle font-medium text-balance text-gray-800 outline-transparent drop-shadow-xs transition-colors duration-100 select-none focus-within:outline-gray-400/50 hover:cursor-pointer not-disabled:hover:border-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.99] not-disabled:active:border-gray-300 not-disabled:active:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <div class="flex flex-col justify-start gap-0.5">
                      <p
                        class="font-poppins text-2xs flex w-full min-w-fit flex-row border-0 p-0 leading-tight text-gray-800/50 outline-0"
                      >
                        {sessions.id}
                      </p>
                      <div class="flex flex-col">
                        <h2 class="font-poppins text-lg font-medium">
                          {sessions.startTime.toLocaleDateString(
                            navigator.language,
                            {
                              dateStyle: 'medium',
                            }
                          )}
                        </h2>
                        <div class="flex flex-row gap-1">
                          <p class="font-nunito leading-tight font-normal">
                            <span class="font-medium"> Start: </span>
                            {sessions.startTime.toLocaleTimeString(
                              navigator.language,
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              }
                            )}
                          </p>
                          <Separator orientation="vertical" />
                          <p class="font-nunito pl-1 leading-tight font-normal">
                            <span class="font-medium"> End: </span>
                            {sessions.endTime.toLocaleTimeString(
                              navigator.language,
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                {/each}
              {:else}
                <p class="font-poppins px-2 py-1 text-base font-normal">
                  No assigned tutoring sessions yet...
                </p>
              {/if}
            </div>
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
    addAvailabilityPanelVisible ? 'fixed' : 'hidden',
    'inset-0 z-100 flex h-full w-full flex-col justify-center bg-[#00000040] p-4 align-middle',
  ]}
>
  <form
    method="post"
    action="?/addAvailability"
    use:enhance
    class="mx-auto flex h-fit w-full max-w-2xl flex-col rounded-md bg-white p-4 drop-shadow-md"
  >
    <div class="flex flex-row justify-between pb-2">
      <h1
        class="font-poppins w-fit pr-8 pb-2 text-xl font-semibold text-blue-900 transition-all duration-100"
      >
        Add a suitable timeslot for you as a tutor
      </h1>
      <button
        type="button"
        class="font-poppins inline-flex max-h-fit min-h-fit max-w-fit min-w-fit flex-row justify-start gap-3 overflow-clip rounded-md border-0 bg-white p-1 text-center align-middle font-medium text-balance text-gray-800 outline-transparent transition-colors duration-100 hover:cursor-pointer not-disabled:hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400/50 active:scale-[0.98] not-disabled:active:bg-red-200 not-disabled:active:text-red-950 disabled:cursor-not-allowed disabled:opacity-50"
        onclick={() =>
          (addAvailabilityPanelVisible = !addAvailabilityPanelVisible)}
      >
        <X class="size-6" weight="bold" />
      </button>
    </div>
    <fieldset class="flex flex-col pb-2 md:flex-row">
      <label
        for="day-of-week"
        class="font-nunito inline-block pt-1 pr-4 text-left font-semibold whitespace-nowrap text-gray-800 md:max-w-32 md:min-w-32"
      >
        Day:
      </label>
      <select
        name="day-of-week"
        id="day-of-week"
        class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 capitalize transition-all duration-100"
      >
        <option class="font-nunito" value={0}>Sunday</option>
        <option class="font-nunito" value={1}>Monday</option>
        <option class="font-nunito" value={2}>Tuesday</option>
        <option class="font-nunito" value={3}>Wednesday</option>
        <option class="font-nunito" value={4}>Thursday</option>
        <option class="font-nunito" value={5}>Friday</option>
        <option class="font-nunito" value={6}>Saturday</option>
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
        name="start-time"
        id="start-time"
        type="time"
        min="09:00"
        max="18:00"
        bind:value={startTime}
        class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 transition-all duration-100"
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
        name="end-time"
        id="end-time"
        type="time"
        min={startTime}
        max="18:00"
        bind:value={endTime}
        class="font-nunito w-full rounded-xs border-1 border-gray-200 p-1 text-gray-700 transition-all duration-100"
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
