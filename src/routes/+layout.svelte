<script lang="ts">
  import { navigating } from '$app/state';
  import LoadingScreen from '$lib/components/global/LoadingScreen.svelte';
  import { blur } from 'svelte/transition';
  import '../app.css';
  import type { Snippet } from 'svelte';
  import { cubicInOut } from 'svelte/easing';

  let { children }: { children: Snippet } = $props();
</script>

{#await navigating.complete}
  <LoadingScreen />
{/await}

{@render children()}
