<script lang="ts">
  import { NavigationMenu } from 'bits-ui';
  import type { Snippet } from 'svelte';

  let {
    menuDuration = 100,
    children,
  }: {
    menuDuration?: number;
    children: Snippet;
  } = $props();
</script>

<NavigationMenu.Root
  class="flex h-fit w-full grow flex-row justify-end align-middle"
>
  <NavigationMenu.List
    class="flex h-full list-none flex-row items-center justify-center gap-2 px-2"
  >
    {@render children()}
  </NavigationMenu.List>
</NavigationMenu.Root>
