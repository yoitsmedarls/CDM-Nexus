<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue, SvelteHTMLElements } from 'svelte/elements';

  let {
    class: additionalStyles,
    children,
    ...restProps
  }: {
    class?:
      | {
          section?: ClassValue | null | undefined;
          div?: ClassValue | null | undefined;
        }
      | undefined;
    children: Snippet;
  } & SvelteHTMLElements['section'] = $props();
</script>

<section
  class={['flex min-h-fit flex-col', additionalStyles?.section]}
  {...restProps}
>
  {#if children}
    <div class={['mx-auto flex w-full grow flex-col', additionalStyles?.div]}>
      {@render children()}
    </div>
  {/if}
</section>
