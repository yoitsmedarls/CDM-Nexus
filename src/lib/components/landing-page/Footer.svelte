<script>
  import Wrapper from './Wrapper.svelte';

  let footerSection = $state([
    {
      heading: 'CDM Nexus',
      options: [
        { name: 'For Students', slug: 'portal/students' },
        { name: 'For Tutors', slug: 'portal/tutors' },
      ],
    },
    {
      heading: 'Resources',
      options: [
        { name: 'All Courses', slug: 'courses' },
        { name: 'Formula Cards', slug: 'formula-cards' },
        { name: 'Mock Exams', slug: 'mock-exams' },
      ],
    },
    {
      heading: 'Connect',
      options: [
        { name: 'Request a tutor', slug: '' },
        { name: 'Facebook', slug: '' },
        { name: 'Email', slug: '' },
      ],
    },
  ]);
</script>

<footer class="flex min-h-fit flex-col px-4">
  <div class="mx-auto w-full max-w-[88rem] grow py-16 md:px-4">
    <div
      class="xs:grid-cols-2 bottom-border-divider grid grow grid-cols-1 md:grid-cols-4"
    >
      {#each footerSection as section, i}
        <div
          class={[
            'xs:px-2 flex grow flex-col justify-start gap-2 pb-16 transition-all duration-200',
            i == 0 ? 'md:col-span-2' : '',
          ]}
        >
          <h6
            class="font-poppins 2xs:text-lg text-center text-base font-semibold text-gray-700 transition-all duration-100 sm:text-xl md:text-left lg:text-[1.375rem]"
          >
            {section.heading}
          </h6>
          <ul class="flex flex-col">
            {#each section.options as option}
              <li
                class="font-nunito 2xs:text-[0.875rem] active:text-cdm-blue-950 hover:text-cdm-blue-900 flex justify-center text-xs font-semibold text-gray-600 transition-all duration-100 sm:text-base md:justify-start lg:text-lg"
              >
                <a
                  href={option.slug}
                  class="block max-w-fit py-2 pr-4 max-md:pl-4">{option.name}</a
                >
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
    <div class="xs:px-2 pt-12 transition-all duration-200">
      <p
        class="2xs:text-xs font-nunito px-4 text-right text-[0.625rem] text-gray-500 transition-all duration-100 sm:text-[0.875rem] lg:text-base"
      >
        &copy; CDM Nexus. All rights reserved.
      </p>
    </div>
  </div>
</footer>

<style lang="postcss">
  .bottom-border-divider {
    border-bottom: 2px solid;
    border-image: linear-gradient(
        to right,
        transparent 25%,
        #06266510 40%,
        #06266520 50%,
        #06266510 60%,
        transparent 75%
      )
      100% 1;
  }
</style>
