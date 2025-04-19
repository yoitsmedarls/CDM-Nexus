<script lang="ts">
  let {
    text,
    disabled = false,
  }: {
    text?: string;
    disabled?: boolean;
  } = $props();
</script>

<div class="mt-2 flex flex-col justify-center">
  <button
    {disabled}
    class="font-poppins rounded-sm bg-gray-200 py-3 text-sm font-medium text-gray-800 transition duration-100 ease-in-out hover:bg-blue-900 hover:text-white active:bg-blue-950 active:text-white md:text-base"
  >
    {text}
  </button>
</div>
