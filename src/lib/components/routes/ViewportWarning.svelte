<script lang="ts">
  import { cubicInOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';

  import type { SvelteHTMLElements } from 'svelte/elements';
  import Logo from '../ui/Logo.svelte';
  import Copyright from '../ui/Copyright.svelte';

  let {
    duration = 100,
    ...restProps
  }: {
    duration?: number;
  } & SvelteHTMLElements['div'] = $props();
</script>

<div
  in:fade={{
    duration: duration,
    easing: cubicInOut,
  }}
  class="fixed inset-0 z-1000 flex h-full w-full flex-col justify-between bg-white/90 px-4 py-8 select-none"
  {...restProps}
>
  <p class="flex items-center justify-center gap-4 text-center">
    <Logo class={{ nexus: 'text-base' }} />
  </p>
  <p
    class="font-poppins flex items-center justify-center gap-4 text-center text-2xl font-semibold text-balance text-blue-900"
  >
    <span> Please resize the window... </span>
  </p>
  <p class="flex items-center justify-center gap-4 text-center">
    <Copyright class="text-3xs text-center" />
  </p>
</div>
