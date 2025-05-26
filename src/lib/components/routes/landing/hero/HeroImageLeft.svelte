<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements';

  import { blur } from 'svelte/transition';

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
  in:blur={{
    duration: duration,
  }}
  style={`background-image: url('${src}');`}
  class="h-[40svh] max-h-[36em] min-h-[18em] max-w-[12em] min-w-[4em] grow self-start rounded-b-full bg-yellow-500 bg-cover bg-center p-4 drop-shadow-xs"
  {...restProps}
></div>
