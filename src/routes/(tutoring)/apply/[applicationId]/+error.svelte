<script lang="ts">
  import { page } from '$app/state';
</script>

<div class="flex flex-col gap-4 py-4 text-center md:text-left">
  <h1 class="font-poppins left text-lg font-medium text-red-600">
    Error {page.status}: {page.error?.message}
  </h1>
  <p class="font-nunito text-balance text-gray-800">
    Looks like something went wrong. Please check the URL and try again.
  </p>
</div>
