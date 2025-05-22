<script lang="ts">
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<div class="flex flex-col justify-start gap-4 pt-8 pb-4 md:pt-0">
  <h1 class="font-poppins text-xl font-medium whitespace-nowrap text-gray-800">
    {data.application.status === 'pending'
      ? 'Application submitted!'
      : 'Application denied'}
  </h1>
  {#if data.application.status === 'pending'}
    <div class="flex flex-col justify-start gap-2">
      <p class="font-nunito text-sm text-gray-800">
        Your application has been received by the CDM Nexus administrators!
      </p>
      <p class="font-nunito text-sm text-gray-800">
        You can come back to this page to check for updates regarding your
        application status.
      </p>
    </div>
    <div class="flex flex-col justify-start gap-4">
      <p class="font-nunito text-sm font-medium">
        Application ID:
        <span
          class="font-nunito block rounded-md border border-gray-100 bg-gray-50 p-1 px-2 text-xs font-normal text-gray-900"
        >
          {data.application.id}
        </span>
      </p>
      <p class="font-nunito text-sm font-medium">
        Date submitted:
        <span
          class="font-nunito block rounded-md border border-gray-100 bg-gray-50 p-1 px-2 text-xs font-normal text-gray-900"
        >
          {data.application.createdAt.toLocaleString(navigator.language, {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </span>
      </p>
    </div>
  {:else}
    <div class="flex flex-col justify-start gap-2">
      <p class="font-nunito text-sm text-gray-800">
        Your application has been reviewed by the CDM Nexus administrators was
        denied.
      </p>
      <p class="font-nunito text-sm text-gray-800">
        Don't worry! You can contact the administrators to appeal your
        application to become a CDM Nexus Tutor!
      </p>
    </div>
    <div class="flex flex-col justify-start gap-4">
      <p class="font-nunito text-sm font-medium">
        Application ID:
        <span
          class="font-nunito block rounded-md border border-gray-100 bg-gray-50 p-1 px-2 text-xs font-normal text-gray-900"
        >
          {data.application.id}
        </span>
      </p>
      <p class="font-nunito text-sm font-medium">
        Date submitted:
        <span
          class="font-nunito block rounded-md border border-gray-100 bg-gray-50 p-1 px-2 text-xs font-normal text-gray-900"
        >
          {data.application.createdAt.toLocaleString(navigator.language, {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </span>
      </p>
    </div>
  {/if}
  <p class="font-nunito text-sm font-medium">
    Status:
    <span
      class={[
        'font-nunito ml-1 text-sm font-bold',
        data.application.status === 'pending'
          ? 'text-yellow-600'
          : 'text-red-600',
      ]}
    >
      {data.application.status[0].toUpperCase() +
        data.application.status.slice(1)}
    </span>
  </p>
</div>
