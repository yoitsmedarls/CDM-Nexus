<script lang="ts">
  import { NavigationMenu } from 'bits-ui';

  import type { Snippet } from 'svelte';
  import { cubicInOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';

  let {
    menuDuration = 100,
    children,
  }: {
    menuDuration?: number;
    children: Snippet;
  } = $props();
</script>

<div
  in:fade={{
    duration: menuDuration,
    easing: cubicInOut,
  }}
>
  <NavigationMenu.Root
    class="relative flex h-fit w-full grow flex-row justify-end align-middle"
  >
    <NavigationMenu.List
      class="flex h-full list-none flex-row items-center justify-center gap-2 px-2"
    >
      {@render children()}
    </NavigationMenu.List>

    <div class="absolute top-full left-0 z-50 flex h-max w-full justify-start">
      <NavigationMenu.Viewport
        forceMount
        class="data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in relative mt-2 h-max w-max origin-top-right overflow-scroll rounded-md border border-gray-200 bg-white text-gray-800 drop-shadow-md transition-[width,_height] duration-200 data-[state=closed]:hidden"
      />
    </div>
  </NavigationMenu.Root>
</div>
