<script lang="ts">
  import type { PageProps } from './$types';

  import { enhance } from '$app/forms';
  import Textarea from '$lib/components/ui/Textarea.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import AccountCard from '$lib/components/ui/AccountCard.svelte';
  import Separator from '$lib/components/ui/Separator.svelte';

  let { data, form }: PageProps = $props();

  let processing = $state(false);
</script>

<div class="flex flex-col justify-start pt-8 pb-4 md:pt-0">
  <h1 class="font-poppins text-xl font-medium whitespace-nowrap text-gray-800">
    Browse tutoring sessions!
  </h1>
  <div class="flex flex-col justify-start gap-2 p-2">
    {#each data.sessions as session (session.id)}
      <div
        class="font-poppins inline-flex min-h-fit min-w-fit flex-row justify-between gap-3 overflow-clip rounded-md border-1 border-gray-100 bg-white px-3 py-2 text-left align-middle font-medium text-balance text-gray-800 outline-transparent drop-shadow-xs transition-colors duration-100 select-none focus-within:outline-gray-400/50 hover:cursor-pointer not-disabled:hover:border-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.99] not-disabled:active:border-gray-300 not-disabled:active:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <div class="flex flex-col justify-start gap-0.5">
          <p
            class="font-poppins text-2xs flex w-full min-w-fit flex-row border-0 p-0 leading-tight text-gray-800/50 outline-0"
          >
            {session.id}
          </p>
          <div class="flex flex-col">
            <h2 class="font-poppins text-lg font-medium">
              {session.name}
            </h2>
            <div class="flex flex-row gap-1 text-gray-600">
              <p class="font-nunito leading-tight font-normal">
                <span class="font-medium"> Start: </span>
                {session.startTime.toLocaleDateString(navigator.language, {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                }) +
                  ', ' +
                  session.startTime.toLocaleTimeString(navigator.language, {
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
              </p>
              <Separator orientation="vertical" />
              <p class="font-nunito pl-1 leading-tight font-normal">
                <span class="font-medium"> End: </span>
                {session.endTime.toLocaleDateString(navigator.language, {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                }) +
                  ', ' +
                  session.endTime.toLocaleTimeString(navigator.language, {
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
              </p>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
