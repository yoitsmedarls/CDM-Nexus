<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  let {
    class: additionalStyles,
  }: {
    class?:
      | {
          cdm?: ClassValue | undefined;
          nexus?: ClassValue | undefined;
        }
      | undefined;
  } = $props();
</script>

<a
  href="/"
  class="whitespace-nowrap transition-transform duration-100 select-none focus-visible:scale-[1.02] focus-visible:outline-0 focus-visible:drop-shadow-xs"
>
  <h1
    class={[
      'font-poppins w-fit font-semibold text-gray-800 transition-all duration-100',
      additionalStyles?.nexus,
    ]}
  >
    <span
      class={[
        'bg-linear-100 from-blue-900/100 from-20% via-yellow-500/80 via-55% to-red-600/100 to-90% bg-clip-text font-extrabold text-[#00000010]',
        additionalStyles?.cdm,
      ]}
    >
      CDM
    </span>
    Nexus
  </h1>
</a>
