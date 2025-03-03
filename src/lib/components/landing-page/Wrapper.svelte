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
  <div
    class="bottom-border-divider mx-auto flex w-full max-w-[88rem] grow flex-col"
  >
    {@render children()}
  </div>
</section>

<style lang="postcss">
  .bottom-border-divider {
    border-bottom: 2px solid;
    border-image: linear-gradient(
        to right,
        transparent 25%,
        #06266510 40%,
        #06266520 50%,
        #06266510 60%,
        transparent 75%
      )
      100% 1;
    border-image-outset: 2rem;
  }
  .limitmaxheight {
    max-height: 88rem;
  }
  .heightsvh {
    height: 100svh;
  }
</style>
