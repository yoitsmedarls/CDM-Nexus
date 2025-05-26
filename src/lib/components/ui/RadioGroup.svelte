<script lang="ts">
  import {
    RadioGroup,
    Label,
    type WithoutChildrenOrChild,
    useId,
  } from 'bits-ui';

  type Item = {
    value: string;
    label: string;
    disabled?: boolean;
  };

  type Props = WithoutChildrenOrChild<RadioGroup.RootProps> & {
    items: Item[];
  };

  let {
    value = $bindable(''),
    ref = $bindable(null),
    items,
    ...restProps
  }: Props = $props();
</script>

<RadioGroup.Root bind:value bind:ref class="flex flex-col gap-2" {...restProps}>
  {#each items as item}
    {@const id = useId()}
    <div class="flex flex-row items-center justify-start px-2 py-1">
      <RadioGroup.Item
        {id}
        value={item.value}
        class="size-5 shrink-0 cursor-default rounded-full border-2 border-gray-400 bg-white transition-all duration-100 ease-in-out hover:border-gray-800 data-[state=checked]:border-6 data-[state=checked]:border-green-600"
        disabled={item.disabled}
      />
      <Label.Root
        for={id}
        class="font-nunito ml-3 text-base font-normal text-gray-800"
      >
        {item.label}
      </Label.Root>
    </div>
  {/each}
</RadioGroup.Root>
