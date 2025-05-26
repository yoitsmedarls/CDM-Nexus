<script lang="ts">
  import type { PageProps } from './$types';

  import Calendar from '$lib/components/ui/Calendar.svelte';

  import MainPanel from '$lib/components/routes/admin-tutor/MainPanel.svelte';
  import SidePanel from '$lib/components/routes/admin-tutor/SidePanel.svelte';
  import Wrapper from '$lib/components/routes/admin-tutor/Wrapper.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import User from 'phosphor-svelte/lib/User';
  import X from 'phosphor-svelte/lib/X';
  import { enhance } from '$app/forms';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Manage Tutors | CDM Nexus Admins</title>
  <meta
    name="description"
    content="Tutor management page for CDM Nexus Administrators."
  />
</svelte:head>

<Wrapper>
  <MainPanel
    heading="Manage tutors"
    subheading="View tutor info, review applications, and more."
    src="https://picsum.photos/seed/cdm/1440/200/?blur=10"
  >
    <div class="flex flex-row items-center justify-between px-2 pt-3">
      <h2
        class="font-poppins w-fit pr-8 text-xl font-semibold text-gray-800 transition-all duration-100 md:text-2xl"
      >
        Tutors and applications
      </h2>
    </div>
    <div class="grid grid-cols-1 gap-2 p-2 pt-0 md:grid-cols-2">
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
            >
              Tutors
            </Button>
          </div>
          <div class="flex grow flex-col justify-between gap-4">
            <div class="flex grow flex-col gap-1">
              {#if data.tutors.length >= 1}
                {#each data.tutors as tutor (tutor.id)}
                  <form
                    method="post"
                    action="?/removeTutor"
                    use:enhance
                    class="font-poppins inline-flex min-h-fit min-w-fit flex-row justify-between gap-3 overflow-clip rounded-md border-1 border-gray-100 bg-white px-3 py-2 text-left align-middle font-medium text-balance text-gray-800 outline-transparent drop-shadow-xs transition-colors duration-100 select-none focus-within:outline-gray-400/50 hover:cursor-pointer not-disabled:hover:border-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.99] not-disabled:active:border-gray-300 not-disabled:active:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <div
                      class="flex w-full flex-row items-center justify-between gap-4"
                    >
                      <div
                        class="mr-1 ml-2 flex max-h-9 min-h-9 max-w-9 min-w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-900/10 text-center align-middle text-red-950 outline-2 outline-offset-2 outline-red-900/50 transition-all duration-100 hover:cursor-pointer active:scale-[0.98]"
                      >
                        <User class="size-7" weight="regular" />
                      </div>
                      <div class="flex grow flex-col">
                        <p
                          class="font-poppins text-xs leading-tight font-medium opacity-60"
                        >
                          {tutor.username}
                        </p>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={tutor.username}
                          class="font-poppins text-2xs hidden w-full min-w-fit flex-row border-0 p-0 leading-tight text-gray-800/50 outline-0"
                        />
                        <h3 class="font-poppins leading-snug font-semibold">
                          {tutor.fullName}
                        </h3>
                        <p
                          class="font-nunito text-xs leading-tight font-normal opacity-90"
                        >
                          Joined: {tutor.dateJoined.toLocaleDateString(
                            navigator.language,
                            { dateStyle: 'medium' }
                          )}
                        </p>
                      </div>
                      <div class="flex flex-col justify-center">
                        <button
                          type="submit"
                          class="font-poppins inline-flex max-h-fit min-h-fit max-w-fit min-w-fit flex-row justify-start gap-3 overflow-clip rounded-md border-0 bg-white p-1 text-center align-middle font-medium text-balance text-gray-800 outline-transparent transition-colors duration-100 hover:cursor-pointer not-disabled:hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400/50 active:scale-[0.98] not-disabled:active:bg-red-200 not-disabled:active:text-red-950 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <X class="size-6" weight="bold" />
                        </button>
                      </div>
                    </div>
                  </form>
                {/each}
              {:else}
                <p
                  class="font-poppins inline-flex flex-col justify-center rounded-md border border-gray-100 bg-white p-2 text-balance text-gray-800"
                >
                  No tutors yet...
                </p>
              {/if}
            </div>
          </div>
        </div>
      </section>
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
            >
              Applications
            </Button>
          </div>
          <div class="flex grow flex-col justify-between gap-4">
            <div class="flex grow flex-col gap-1">
              {#if data.applications.length >= 1}
                {#each data.applications as application (application.id)}
                  <Button
                    href={`/admin/tutors/${application.id}`}
                    class={{
                      button: 'text-left',
                    }}
                  >
                    <div
                      class="flex flex-row items-center justify-between gap-4"
                    >
                      <div
                        class="mr-1 ml-2 flex max-h-9 min-h-9 max-w-9 min-w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-900/10 text-center align-middle text-red-950 outline-2 outline-offset-2 outline-red-900/50 transition-all duration-100 hover:cursor-pointer active:scale-[0.98]"
                      >
                        <User class="size-7" weight="regular" />
                      </div>
                      <div class="flex grow flex-col">
                        <p
                          class="font-poppins text-xs leading-tight font-medium opacity-60"
                        >
                          {application.id}
                        </p>
                        <h3 class="font-poppins leading-snug font-semibold">
                          {application.name}
                        </h3>
                        <p
                          class="font-nunito text-xs leading-tight font-normal opacity-90"
                        >
                          Submitted: {application.createdAt.toLocaleDateString(
                            navigator.language,
                            { dateStyle: 'medium' }
                          )}
                        </p>
                      </div>
                    </div>
                  </Button>
                {/each}
              {:else}
                <p
                  class="font-poppins inline-flex flex-col justify-center rounded-md border border-gray-100 bg-white p-2 text-balance text-gray-800"
                >
                  No tutor applications yet...
                </p>
              {/if}
            </div>
          </div>
        </div>
      </section>
    </div>
  </MainPanel>
  <SidePanel duration={200}>
    <Calendar />
  </SidePanel>
</Wrapper>
