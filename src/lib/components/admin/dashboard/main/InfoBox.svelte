<script lang="ts">
  let {
    info,
    label,
    description,
  }: {
    info: string;
    label: string;
    description: string;
  } = $props();
</script>

<hgroup
  class="flex max-h-48 min-h-20 w-full min-w-20 grow flex-col items-center justify-center overflow-clip rounded-md bg-gray-100 p-2 transition-all duration-100 xl:min-h-28"
>
  <h2
    class="font-poppins 2xs:text-base text-[0.875rem] font-semibold text-gray-800 transition-all duration-100 sm:text-lg lg:text-xl"
  >
    {info}
    {label}
  </h2>
  <p
    class="font-nunito 2xs:text-[0.625rem] text-[0.5rem] leading-tight font-semibold text-balance text-gray-500 transition-all duration-100 sm:text-[0.75rem] lg:text-[0.875rem]"
  >
    {description}
  </p>
</hgroup>
