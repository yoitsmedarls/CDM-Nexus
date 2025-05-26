<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    heading,
    subheading,
    src,
    children,
  }: {
    heading: string | undefined;
    subheading: string | undefined;
    src?: string;
    children: Snippet;
  } = $props();
</script>

<main
  class="flex h-max min-h-full shrink grow flex-col overflow-hidden border-gray-200 bg-white xl:rounded-md xl:border xl:drop-shadow-xs"
>
  <header
    style={src ? `background-image: url(${src})` : ''}
    class="flex flex-col bg-gray-500 bg-cover bg-bottom p-4 pt-12 pb-6 transition-all duration-200 xl:pt-16"
  >
    <h1
      class="font-poppins w-fit text-2xl font-semibold text-white transition-all duration-100 md:text-3xl"
    >
      {heading}
    </h1>
    <p
      class="font-nunito text-sm font-medium text-white transition-all duration-100 md:text-base"
    >
      {subheading}
    </p>
  </header>
  <div class="p-4">
    {@render children()}
  </div>
</main>
