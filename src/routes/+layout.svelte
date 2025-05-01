<script lang="ts">
  import { navigating } from '$app/state';
  import '../app.css';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

{#await navigating.complete}
  <h1>Loading...</h1>
{/await}

{@render children()}
