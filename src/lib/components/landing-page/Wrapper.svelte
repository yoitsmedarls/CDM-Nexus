<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    id = '',
    limitmaxheight = false,
    setheightscreen = false,
    children,
  }: {
    id?: string;
    limitmaxheight?: boolean;
    setheightscreen?: boolean;
    children?: Snippet;
  } = $props();
</script>

<section
  {id}
  class={[
    'flex min-h-fit flex-col px-4',
    { limitmaxheight },
    { setheightscreen },
  ]}
>
  <div class={['mx-auto flex w-full max-w-[88rem] grow flex-col']}>
    {#if children}
      {@render children()}
    {/if}
  </div>
</section>

<style>
  .limitmaxheight {
    max-height: 88rem;
  }
  .setheightscreen {
    height: 100svh;
  }
</style>
