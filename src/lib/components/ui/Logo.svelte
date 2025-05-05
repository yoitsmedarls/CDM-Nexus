<script lang="ts">
  let {
    cdmProps,
    nexusProps,
  }: {
    cdmProps?: string | undefined;
    nexusProps?: string | undefined;
  } = $props();
</script>

<a
  href="/"
  class="transition-transform duration-100 focus-visible:scale-[1.02] focus-visible:outline-0 focus-visible:drop-shadow-xs"
>
  <h1
    class={[
      'font-poppins w-fit font-semibold text-gray-800 transition-all duration-100',
      nexusProps,
    ]}
  >
    <span
      class={[
        'bg-linear-100 from-blue-900/100 from-20% via-yellow-500/80 via-55% to-red-600/100 to-90% bg-clip-text font-extrabold text-[#00000010]',
        cdmProps,
      ]}
    >
      CDM
    </span>
    Nexus
  </h1>
</a>
