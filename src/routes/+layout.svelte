<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';
  import { navigating } from '$app/state';
  import LoadingScreen from '$lib/components/global/LoadingScreen.svelte';
  import { App } from '$lib/components/global/App.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<svelte:window
  bind:innerWidth={App.viewport.width}
  bind:innerHeight={App.viewport.height}
  bind:scrollX={App.scroll.x}
  bind:scrollY={App.scroll.y}
/>

{#await navigating.complete}
  <LoadingScreen />
{/await}

{@render children()}
