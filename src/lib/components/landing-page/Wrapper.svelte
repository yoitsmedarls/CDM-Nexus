<script>
  let { children } = $props();
</script>

<section class="flex min-h-svh flex-col px-4">
  <div class="mx-auto flex w-full max-w-[1440px] grow flex-col">
    {@render children()}
  </div>
</section>
