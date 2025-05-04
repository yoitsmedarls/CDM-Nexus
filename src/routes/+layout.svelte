<script lang="ts">
  import type { Snippet } from 'svelte';

  import '../app.css';
  import { navigating } from '$app/state';

  let { children }: { children: Snippet } = $props();
</script>

{#await navigating.complete}
  <h1>Loading...</h1>
{/await}

{@render children()}
