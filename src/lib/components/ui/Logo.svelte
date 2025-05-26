<script lang="ts">
  import type { ClassValue, SvelteHTMLElements } from 'svelte/elements';

  let {
    class: additionalStyles,
    href,
    ...restProps
  }: {
    class?:
      | {
          cdm?: ClassValue | undefined;
          nexus?: ClassValue | undefined;
        }
      | undefined;
    href?: string | undefined;
  } & (SvelteHTMLElements['a'] | SvelteHTMLElements['span']) = $props();
</script>

<svelte:element
  this={href ? 'a' : 'span'}
  {href}
  class="whitespace-nowrap transition-transform duration-100 select-none focus-visible:scale-[1.02] focus-visible:outline-0 focus-visible:drop-shadow-xs"
  {...restProps}
>
  <h1
    class={[
      'font-poppins w-fit font-semibold text-gray-800 transition-all duration-100',
      additionalStyles?.nexus,
    ]}
  >
    <span
      class={[
        'bg-linear-100 from-blue-900/100 from-20% via-yellow-500/80 via-55% to-red-600/100 to-90% bg-clip-text font-extrabold text-[#00000010]',
        additionalStyles?.cdm,
      ]}
    >
      CDM
    </span>
    Nexus
  </h1>
</svelte:element>
