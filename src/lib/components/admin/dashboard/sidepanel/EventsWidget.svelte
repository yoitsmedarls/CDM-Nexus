<script lang="ts">
  let events: { id: number; text: string }[] = $state([]);

  for (let index = 1; index <= 8; index++) {
    events.push({ id: index, text: 'Event No. ' + index });
  }
</script>

<section
  class="min-h-48 rounded-md border-gray-200 bg-white p-2 max-md:bg-gray-100"
>
  <h2
    class="font-poppins 2xs:text-[0.875rem] pb-2 text-[0.75rem] font-semibold text-gray-800 transition-all duration-100 sm:text-base lg:text-lg"
  >
    Events
  </h2>
  {#each events as event (event.id)}
    <div class="flex flex-col justify-center">
      <h3
        class="font-nunito 2xs:text-[0.75rem] hover:bg-cdm-red-50 rounded-sm p-2 pb-2 text-[0.675rem] font-semibold text-gray-800 transition-all duration-100 sm:text-[0.875rem] lg:text-base"
      >
        {event.text}
      </h3>
    </div>
  {/each}
</section>

<style>
</style>
