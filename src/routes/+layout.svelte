<script lang="ts">
  import '../app.css';

  import type { Snippet } from 'svelte';
  import { navigating } from '$app/state';
  import { App } from '$lib/components/global/App.svelte';
  import LoadingOverlay from '$lib/components/routes/LoadingOverlay.svelte';

  let {
    children,
  }: {
    children: Snippet;
  } = $props();
</script>

<svelte:window
  bind:innerWidth={App.viewport.width}
  bind:innerHeight={App.viewport.height}
  bind:scrollX={App.scroll.x}
  bind:scrollY={App.scroll.y}
/>

{#await navigating.complete}
  <LoadingOverlay duration={100} />
{/await}

{@render children()}
