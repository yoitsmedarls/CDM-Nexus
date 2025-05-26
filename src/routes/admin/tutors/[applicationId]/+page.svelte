<script lang="ts">
  import type { PageProps } from './$types';

  import Calendar from '$lib/components/ui/Calendar.svelte';

  import MainPanel from '$lib/components/routes/admin-tutor/MainPanel.svelte';
  import SidePanel from '$lib/components/routes/admin-tutor/SidePanel.svelte';
  import Wrapper from '$lib/components/routes/admin-tutor/Wrapper.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Separator from '$lib/components/ui/Separator.svelte';
  import { enhance } from '$app/forms';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>View Application | CDM Nexus Admins</title>
  <meta
    name="description"
    content="Application approval page for CDM Nexus Administrators."
  />
</svelte:head>

<Wrapper>
  <MainPanel
    heading="View application"
    subheading="View, approve, or deny tutor applications."
    src="https://picsum.photos/seed/cdm/1440/200/?blur=10"
  >
    <div class="flex flex-row items-center justify-between px-2 pt-3">
      <h2
        class="font-poppins w-fit pr-8 text-xl font-semibold text-gray-800 transition-all duration-100 md:text-2xl"
      >
        Application details
      </h2>
    </div>
    <div class="grid grid-cols-1 gap-2 p-2 pt-0">
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
              {data.application.name}
            </Button>
          </div>
          <form
            method="POST"
            action="?/acceptApplication"
            use:enhance
            class="flex grow flex-col justify-between gap-2 rounded-md border border-gray-100 bg-white p-2 drop-shadow-xs"
          >
            <div class="flex flex-col justify-start p-2">
              <p class="font-nunito font-normal text-gray-800">
                <span class="font-bold">Application ID:</span>
                {data.application.id}
              </p>
              <input
                type="text"
                id="application-id"
                name="application-id"
                value={data.application.id}
                class="font-poppins text-2xs hidden w-full min-w-fit flex-row border-0 p-0 leading-tight text-gray-800/50 outline-0"
              />
              <p class="font-nunito font-normal text-gray-800">
                <span class="block font-bold">Message:</span>
                {data.application.message}
              </p>
            </div>
            <Separator orientation="horizontal" />
            <div class="flex flex-row justify-end gap-2">
              <Button
                type="submit"
                variant="primary"
                class={{ span: 'text-sm md:text-base' }}
              >
                Accept
              </Button>
              <Button
                variant="destructive"
                formaction="?/denyApplication"
                class={{ span: 'text-sm md:text-base' }}
              >
                Deny
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </MainPanel>
  <SidePanel duration={200}>
    <Calendar />
  </SidePanel>
</Wrapper>
