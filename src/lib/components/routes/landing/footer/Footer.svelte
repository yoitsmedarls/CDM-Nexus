<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import Copyright from '$lib/components/ui/Copyright.svelte';
  import Separator from '$lib/components/ui/Separator.svelte';

  let {
    optgroups,
  }: {
    optgroups: {
      heading: string;
      options: {
        name: string;
        slug: string;
      }[];
    }[];
  } = $props();
</script>

<footer class="flex min-h-fit flex-col px-8 py-4">
  <div class="flex flex-col py-8">
    <Separator orientation="horizontal" decorative />
  </div>
  <div class="grid grow grid-cols-2 px-4 md:grid-cols-3">
    {#each optgroups as optgroup, index (optgroup.heading)}
      <div
        class={[
          'flex grow flex-col justify-start pb-8',
          index == 0 ? 'transition-all duration-100 md:col-span-2' : '',
        ]}
      >
        <h6
          class="font-poppins pb-2 text-center text-base font-semibold text-gray-700 transition-all duration-100 md:text-left md:text-lg"
        >
          {optgroup.heading}
        </h6>
        <ul class="flex flex-col">
          {#each optgroup.options as option (option.name)}
            <li>
              <Button
                variant="underline"
                href={option.slug}
                class={{
                  button: 'w-full',
                  span: 'font-nunito py-1 text-center text-sm font-normal opacity-75 transition-all duration-100 md:text-left md:text-base',
                }}
              >
                {option.name}
              </Button>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
  <div class="flex flex-col justify-between">
    <div class="flex flex-row">
      <Separator orientation="horizontal" decorative />
    </div>
    <div class="flex flex-row justify-center-safe px-2 pt-4 pb-2">
      <Copyright class="text-3xs md:text-2xs" />
    </div>
  </div>
</footer>
