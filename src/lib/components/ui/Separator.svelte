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
      ? 'my-1 h-px max-h-px min-h-px w-full max-w-full min-w-full'
      : 'mx-2 h-full max-h-full min-h-full w-px max-w-px min-w-px',
    additionalStyles,
  ]}
  {...restProps}
/>
