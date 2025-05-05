<script lang="ts">
  import { cubicInOut } from 'svelte/easing';
  import { blur } from 'svelte/transition';

  import CircleNotch from 'phosphor-svelte/lib/CircleNotch';
  import type { SvelteHTMLElements } from 'svelte/elements';

  let {
    duration = 100,
    ...restProps
  }: {
    duration?: number;
  } & SvelteHTMLElements['div'] = $props();
</script>

<div
  in:blur={{
    duration: duration,
    easing: cubicInOut,
  }}
  class="fixed inset-0 z-1000 flex h-full w-full flex-col justify-center bg-white/75"
  {...restProps}
>
  <p
    class="font-poppins flex items-center justify-center gap-4 text-center text-2xl font-semibold text-blue-900"
  >
    <CircleNotch class="size-8 animate-spin" />
    <span> Loading... </span>
  </p>
</div>
