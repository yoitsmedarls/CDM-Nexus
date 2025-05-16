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

<div
  class="flex max-h-40 min-h-20 grow flex-col items-center justify-center overflow-clip rounded-md border border-gray-100 bg-gray-50 p-2 transition-all duration-100 xl:min-h-24"
>
  <h2
    class="font-poppins text-center text-base font-semibold text-gray-800 transition-all duration-100 md:text-lg"
  >
    {info !== '0' ? info : 'No'}
    {label}
  </h2>
  <p
    class="font-nunito text-center text-xs leading-tight font-semibold text-balance text-gray-500 transition-all duration-100 md:text-sm"
  >
    {description}
  </p>
</div>
