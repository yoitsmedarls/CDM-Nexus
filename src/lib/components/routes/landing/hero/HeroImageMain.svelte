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
  class="grow-7 rounded-lg bg-blue-900 bg-cover bg-center p-4 drop-shadow-xs"
  {...restProps}
></div>
