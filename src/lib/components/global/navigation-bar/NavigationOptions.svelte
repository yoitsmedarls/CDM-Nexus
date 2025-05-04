<script lang="ts">
  let {
    options,
  }: {
    options: {
      text: string;
      slug: string;
    }[];
  } = $props();
</script>

{#each options as option (option.slug)}
  <a
    href="/{option.slug}"
    class="font-poppins p-2 text-base font-semibold text-gray-800 transition-all duration-100 hover:text-blue-900 active:text-blue-950"
  >
    {option.text}
  </a>
{/each}
