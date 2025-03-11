<script lang="ts">
  import NavigationBar from '$lib/components/admin/NavigationBar.svelte';
  import type { Snippet } from 'svelte';

  let viewportWidth: number = $state(0);
  let inDuration: number = $state(200);
  let navigationOptions = $state([
    { text: 'Account', slug: 'account' },
    { text: 'Courses', slug: 'courses' },
    { text: 'Tutors', slug: 'tutors' },
    { text: 'Schedules', slug: 'schedules' },
    { text: 'Settings', slug: 'settings' },
  ]);

  let { children }: { children: Snippet } = $props();
</script>

<svelte:window bind:innerWidth={viewportWidth} />

<div
  class="mx-auto flex w-full max-w-[128rem] grow flex-col justify-between xl:flex-row"
>
  <NavigationBar {inDuration} {navigationOptions} {viewportWidth}
  ></NavigationBar>
  <div class="flex grow flex-col md:flex-row xl:gap-2 xl:py-2 xl:pr-2">
    {@render children()}
  </div>
</div>
