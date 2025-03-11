<script lang="ts">
  import { page } from '$app/state';
</script>

<main class="flex grow flex-col justify-center">
  <h1
    class="font-poppins 2xs:text-xl text-cdm-red-600 p-4 text-center text-lg font-semibold text-balance sm:text-2xl lg:text-3xl"
  >
    Error {page.status}:
    <br />
    {page.error?.message}
  </h1>
</main>
