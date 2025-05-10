<script lang="ts">
  import { Separator, type WithoutChildrenOrChild } from 'bits-ui';

  let {
    class: additionalStyles = 'bg-black/5',
    ...restProps
  }: WithoutChildrenOrChild<Separator.RootProps> = $props();
</script>

<Separator.Root
  class={[
    restProps.orientation === 'horizontal'
      ? 'my-1 h-px w-full'
      : 'mx-1 h-full w-px',
    additionalStyles,
  ]}
  {...restProps}
/>
