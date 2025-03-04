<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    id = '',
    limitmaxheight = false,
    heightsvh = false,
    children,
  }: {
    id?: string;
    limitmaxheight?: boolean;
    heightsvh?: boolean;
    children: Snippet;
  } = $props();
</script>

<section
  {id}
  class={['flex min-h-fit flex-col px-4', { limitmaxheight }, { heightsvh }]}
>
  <div class={['mx-auto flex w-full max-w-[88rem] grow flex-col']}>
    {@render children()}
  </div>
</section>

<style lang="postcss">
  .limitmaxheight {
    max-height: 88rem;
  }
  .heightsvh {
    height: 100svh;
  }
</style>
