<script lang="ts">
  import { navigating } from '$app/state';
  import LoadingScreen from '$lib/components/global/LoadingScreen.svelte';
  import '../app.css';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

{#await navigating.complete}
  <LoadingScreen />
{/await}

{@render children()}
