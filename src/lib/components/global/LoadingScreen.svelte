<script lang="ts">
  import { blur } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
</script>

<div
  in:blur={{
    duration: 100,
    easing: cubicInOut,
  }}
  class="fixed inset-0 z-50 bg-white/75"
>
  <div class="flex h-full w-full flex-col justify-center">
    <p class="font-poppins text-center text-2xl font-semibold text-blue-950">
      Loading...
    </p>
  </div>
</div>
