<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';
  import { navigating } from '$app/state';
  import LoadingScreen from '$lib/components/global/LoadingScreen.svelte';

  let { children }: { children: Snippet } = $props();
</script>

{#await navigating.complete}
  <LoadingScreen />
{/await}

{@render children()}
