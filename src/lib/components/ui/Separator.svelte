<script lang="ts">
  import { Separator, type WithoutChildrenOrChild } from 'bits-ui';

  let {
    class: additionalStyles = 'bg-black/5',
    ...restProps
  }: WithoutChildrenOrChild<Separator.RootProps> = $props();
</script>

<Separator.Root
  class={[
    'block shrink-0',
    restProps.orientation === 'horizontal'
      ? 'my-1 h-px w-full'
      : 'mx-2 h-full w-px',
    additionalStyles,
  ]}
  {...restProps}
/>
