<script lang="ts">
  import { cubicInOut } from 'svelte/easing';
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { fade } from 'svelte/transition';

  let {
    src,
    duration = 100,
    ...restProps
  }: {
    src: string;
    duration?: number;
  } & SvelteHTMLElements['div'] = $props();
</script>

<div
  in:fade={{
    duration: duration,
    easing: cubicInOut,
  }}
  style={`background-image: url('${src}');`}
  class="fixed flex h-full w-full grow flex-col bg-black/50 bg-cover bg-scroll bg-center bg-no-repeat brightness-50 transition-all duration-100"
  {...restProps}
></div>
