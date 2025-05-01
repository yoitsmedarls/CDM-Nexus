<script lang="ts">
  import { Avatar, type WithoutChildrenOrChild } from 'bits-ui';

  let {
    src,
    alt,
    fallback,
    ref = $bindable(null),
    imageRef = $bindable(null),
    fallbackRef = $bindable(null),
    ...restProps
  }: WithoutChildrenOrChild<Avatar.RootProps> & {
    src: string;
    alt: string;
    fallback: string;
    imageRef?: HTMLImageElement | null;
    fallbackRef?: HTMLElement | null;
  } = $props();
</script>

<Avatar.Root
  {...restProps}
  bind:ref
  class="size-12 rounded-full border-2 bg-gray-100 text-[17px] font-medium text-gray-800 uppercase data-[status=error]:border-red-900/50 data-[status=loaded]:border-blue-900/50 data-[status=loading]:border-transparent"
>
  <div
    class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
  >
    <Avatar.Image {src} {alt} bind:ref={imageRef} />
    <Avatar.Fallback
      class="font-poppins text-center font-medium"
      bind:ref={fallbackRef}
    >
      {fallback}
    </Avatar.Fallback>
  </div>
</Avatar.Root>
