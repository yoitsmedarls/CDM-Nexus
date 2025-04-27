<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';
  import { navigating } from '$app/state';
  import LoadingScreen from '$lib/components/global/LoadingScreen.svelte';
  import { App } from '$lib/components/global/App.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<svelte:window
  bind:innerWidth={App.viewportWidth}
  bind:innerHeight={App.viewportHeight}
/>

{#await navigating.complete}
  <LoadingScreen />
{/await}

{@render children()}
