<script lang="ts">
  import '../app.css';

  import type { LayoutProps } from './$types';

  import { App } from '$lib/components/global/App.svelte';

  import { navigating } from '$app/state';
  import { fade } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';

  import LoadingOverlay from '$lib/components/routes/LoadingOverlay.svelte';
  import ViewportWarning from '$lib/components/routes/ViewportWarning.svelte';

  let { children }: LayoutProps = $props();
</script>

<!-- Window bindings for our global app state object -->
<svelte:window
  bind:innerWidth={App.viewport.width}
  bind:innerHeight={App.viewport.height}
  bind:scrollX={App.scroll.x}
  bind:scrollY={App.scroll.y}
/>

<!-- Loading overlay during client-side navigation -->
{#await navigating.complete}
  <LoadingOverlay duration={200} />
{/await}

{#if App.viewport.width === 0}
  <!-- The global app state object takes a bit of time to initialise which means the viewport property of that object is initially 0. -->
  <!-- This causes weird layout shifts in the UI on the initial page load. -->
  <!-- As such, this condition shows a loading indicator to allow the global app state to load first before showing anything to the end user. -->
  <LoadingOverlay duration={200} />
{:else if App.viewport.width < App.breakpoints.min}
  <!-- This condition then handles the cases where the viewport is too narrow after loading the page, instructing the user to resize their window. -->
  <ViewportWarning duration={200} />
{:else}
  <!-- Shows the UI if everything is working as expected. -->
  <div
    class="flex grow flex-col"
    in:fade={{
      duration: 250,
      easing: cubicInOut,
    }}
  >
    {@render children()}
  </div>
{/if}
