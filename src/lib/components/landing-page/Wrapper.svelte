<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    id = '',
    limitHeight = false,
    children,
  }: {
    id?: string;
    limitHeight?: boolean;
    children: Snippet;
  } = $props();
</script>

<section {id} class={['flex h-svh flex-col px-4', { limitHeight }]}>
  <div
    class="bottom-border-divider mx-auto flex w-full max-w-[1440px] grow flex-col"
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
    border-image-outset: 1em;
  }
  .limitHeight {
    max-height: 1440px;
  }
</style>
