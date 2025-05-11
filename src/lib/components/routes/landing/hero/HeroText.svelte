<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';

  let {
    mainText,
    subText,
    actionButton,
    ...restProps
  }: {
    mainText: Snippet;
    subText: Snippet;
    actionButton: Snippet;
  } & SvelteHTMLElements['div'] = $props();
</script>

<div class="relative z-10" {...restProps}>
  <div
    class="xs:left-0 xs:bg-transparent xs:px-0 xs:w-fit max-xs:overflow-clip absolute right-4 bottom-4 left-4 z-10 flex flex-col rounded-md bg-white px-4 py-4 transition-all duration-100"
  >
    <div class="flex flex-col gap-4 pb-6">
      <h1
        class="font-poppins xs:text-6xl text-4xl leading-tight font-bold transition-all duration-100 md:text-7xl"
      >
        {@render mainText()}
      </h1>
      <p
        class="font-nunito font-semi xs:text-lg text-base leading-tight transition-all duration-100 md:text-xl"
      >
        {@render subText()}
      </p>
    </div>
    <span class="max-h-fit max-w-fit rounded-md bg-white py-1.5 pr-1.5">
      {@render actionButton()}
    </span>
  </div>
</div>
