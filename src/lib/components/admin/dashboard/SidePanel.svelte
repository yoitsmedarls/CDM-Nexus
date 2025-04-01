<script lang="ts">
  let events: { text: string }[] = $state([]);
  for (let index = 1; index <= 8; index++) {
    events.push({ text: 'Event No. ' + index });
  }
</script>

<aside
  class="xl:bg-cdm-red-50 flex w-full flex-col gap-2 rounded-md px-2 py-4 transition-all duration-100 md:w-[25%] md:max-w-xs md:min-w-[16rem] md:bg-gray-50"
>
  <section
    class="min-h-48 rounded-md border-gray-200 bg-white p-2 max-md:bg-gray-100"
  >
    <h2
      class="font-poppins 2xs:text-[0.875rem] pb-2 text-[0.75rem] font-semibold text-gray-800 transition-all duration-100 sm:text-base lg:text-lg"
    >
      Calendar
    </h2>
    <div id="calendar"></div>
  </section>
  <section
    class="min-h-48 rounded-md border-gray-200 bg-white p-2 max-md:bg-gray-100"
  >
    <h2
      class="font-poppins 2xs:text-[0.875rem] pb-2 text-[0.75rem] font-semibold text-gray-800 transition-all duration-100 sm:text-base lg:text-lg"
    >
      Events
    </h2>
    {#each events as event}
      <div class="flex flex-col justify-center">
        <h3
          class="font-nunito 2xs:text-[0.75rem] hover:bg-cdm-red-50 rounded-sm p-2 pb-2 text-[0.675rem] font-semibold text-gray-800 transition-all duration-100 sm:text-[0.875rem] lg:text-base"
        >
          {event.text}
        </h3>
      </div>
    {/each}
  </section>
</aside>

<style>
</style>
