<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { cubicInOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';

  let {
    duration,
  }: {
    duration: number;
  } = $props();
</script>

<Dialog.Overlay class="fixed inset-0 z-90 bg-black/50" forceMount>
  {#snippet child({ props, open })}
    {#if open}
      <div
        {...props}
        transition:fade={{
          duration: duration,
          easing: cubicInOut,
        }}
      ></div>
    {/if}
  {/snippet}
</Dialog.Overlay>
