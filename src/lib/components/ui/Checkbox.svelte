<script lang="ts">
  import { Checkbox, Label, useId, type WithoutChildrenOrChild } from 'bits-ui';
  import Check from 'phosphor-svelte/lib/Check';

  let {
    id,
    checked = $bindable(false),
    ref = $bindable(null),
    labelText,
    labelRef = $bindable(null),
    ...restProps
  }: WithoutChildrenOrChild<Checkbox.RootProps> & {
    id: string;
    labelText: string;
    labelRef?: HTMLLabelElement | null;
  } = $props();
</script>

<div class="flex max-w-fit flex-row items-center rounded-md px-2">
  <Checkbox.Root
    {id}
    aria-labelledby={id.concat('-label')}
    class="peer inline-flex min-h-6 min-w-6 items-center justify-center rounded-md border-1 border-transparent bg-blue-950 text-white outline-transparent transition-colors duration-100 ease-in-out not-disabled:focus-visible:outline-2 not-disabled:focus-visible:outline-offset-2 not-disabled:focus-visible:outline-blue-950/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-white not-disabled:data-[state=unchecked]:border-blue-950/50 not-disabled:data-[state=unchecked]:bg-white not-disabled:data-[state=unchecked]:hover:border-blue-900 not-disabled:data-[state=unchecked]:active:border-blue-950"
    bind:checked
    bind:ref
    {...restProps}
  >
    {#snippet children({ checked })}
      <div>
        {#if checked}
          <Check class="size-4" weight="bold" />
        {/if}
      </div>
    {/snippet}
  </Checkbox.Root>
  <Label.Root
    id={id.concat('-label')}
    class="font-nunito inline-flex pl-3 align-middle text-base leading-none font-normal text-balance text-gray-800 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    for={id}
    bind:ref={labelRef}
  >
    {labelText}
  </Label.Root>
</div>
