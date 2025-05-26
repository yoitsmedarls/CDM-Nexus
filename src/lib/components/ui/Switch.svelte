<script lang="ts">
  import { Switch, Label, type WithoutChildrenOrChild } from 'bits-ui';

  let {
    id,
    checked = $bindable(false),
    ref = $bindable(null),
    labelText,
    ...restProps
  }: WithoutChildrenOrChild<Switch.RootProps> & {
    labelText: string;
  } = $props();
</script>

<Switch.Root
  bind:checked
  bind:ref
  {id}
  class="peer inline-flex h-8 min-h-8 w-16 shrink-0 cursor-pointer items-center rounded-full px-1 transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-800/50 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200"
  {...restProps}
>
  <Switch.Thumb
    class="pointer-events-none block size-6 shrink-0 rounded-full bg-white transition-transform duration-200 ease-in-out data-[state=checked]:translate-x-8 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:drop-shadow-xs"
  />
</Switch.Root>
<Label.Root
  for={id}
  class="font-nunito ml-4 text-lg font-medium text-gray-800 md:text-xl"
>
  {labelText}
</Label.Root>
