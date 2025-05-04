<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    id = '',
    maxheight = 0,
    maxwidth = 0,
    hscreen = false,
    children,
  }: {
    id?: string | undefined;
    maxheight?: number | undefined;
    maxwidth?: number | undefined;
    hscreen?: boolean | undefined;
    children?: Snippet | undefined;
  } = $props();
</script>

<section
  {id}
  class={[
    'flex min-h-fit flex-col',
    maxheight ? `max-h-[${maxheight}rem]` : '',
    hscreen ? 'h-svh' : '',
  ]}
>
  {#if children}
    <div
      class={[
        'mx-auto flex w-full grow flex-col',
        maxwidth ? `max-w-[${maxwidth}rem]` : '',
      ]}
    >
      {@render children()}
    </div>
  {/if}
</section>
