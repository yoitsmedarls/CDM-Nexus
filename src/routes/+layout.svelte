<script lang="ts">
  import '../app.css';

  import type { Snippet } from 'svelte';

  import { navigating } from '$app/state';

  let { children }: { children: Snippet } = $props();
</script>

{#await navigating.complete}
  <h1>Loading</h1>
{/await}

{@render children()}
