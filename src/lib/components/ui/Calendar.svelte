<script lang="ts">
  import { Calendar } from 'bits-ui';
  import {
    DateFormatter,
    getLocalTimeZone,
    today,
    type DateValue,
  } from '@internationalized/date';
  import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
  import CaretRight from 'phosphor-svelte/lib/CaretRight';

  const currentDate = today(getLocalTimeZone());

  const formatter = new DateFormatter('en-US', {
    month: 'long',
  });

  const monthList = Array.from({ length: 12 }, (_, i) => {
    const month = currentDate.set({ month: i + 1 });
    return {
      value: month.month,
      label: formatter.format(month.toDate(getLocalTimeZone())),
    };
  });

  const currentYear = new Date().getFullYear();
  const yearList = Array.from({ length: 30 }, (_, i) => currentYear - i);
  let placeholder = $state(currentDate);

  let {
    value = $bindable(today(getLocalTimeZone())),
    variant = 'default',
    ...restProps
  }: {
    variant?: 'default' | 'withPicker' | undefined;
    value?: DateValue | undefined;
  } = $props();
</script>

<Calendar.Root
  class="max-h-fit w-full overflow-auto rounded-md border border-gray-200 bg-white p-2 pt-3"
  weekdayFormat="short"
  fixedWeeks={true}
  type="single"
  {...restProps}
  bind:value
  bind:placeholder
>
  {#snippet children({ months, weekdays })}
    <Calendar.Header class="flex items-center justify-between gap-2">
      {#if variant === 'withPicker'}
        <select
          aria-label="Select month"
          value={placeholder.month}
          class="font-poppins inline-flex w-full min-w-fit items-center justify-center rounded-md border-0 bg-white text-base font-medium text-gray-800 outline-transparent transition-colors duration-100 open:bg-blue-100 hover:bg-blue-50 hover:text-blue-950 open:hover:bg-blue-100 focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950/50 active:bg-blue-100 active:text-blue-950"
          onchange={(e) => {
            const month = parseInt(e.currentTarget.value);
            placeholder = placeholder.set({ month });
          }}
        >
          {#each monthList as month (month.value)}
            <option class="font-nunito bg-white text-sm" value={month.value}>
              {month.label}
            </option>
          {/each}
        </select>
        <select
          aria-label="Select year"
          value={placeholder.year}
          class="font-poppins inline-flex max-w-fit min-w-fit items-center justify-center rounded-md border-0 bg-white text-base font-medium text-gray-800 outline-transparent transition-colors duration-100 open:bg-blue-100 hover:bg-blue-50 hover:text-blue-950 open:hover:bg-blue-100 focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950/50 active:bg-blue-100 active:text-blue-950"
          onchange={(e) => {
            const year = parseInt(e.currentTarget.value);
            placeholder = placeholder.set({ year });
          }}
        >
          {#each yearList as year (year)}
            <option class="font-nunito bg-white text-sm" value={year}>
              {year}
            </option>
          {/each}
        </select>
      {:else}
        <Calendar.Heading
          class="font-poppins w-full pl-2 text-left text-base font-medium text-balance text-gray-800"
        />
        <Calendar.PrevButton
          class="inline-flex min-h-8 min-w-8 items-center justify-center rounded-md bg-white text-gray-800 outline-transparent transition-colors duration-100 hover:bg-blue-50 hover:text-blue-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800/50 active:scale-[0.98] active:bg-blue-100 active:text-blue-950"
        >
          <CaretLeft class="size-5" />
        </Calendar.PrevButton>
        <Calendar.NextButton
          class="inline-flex min-h-8 min-w-8 items-center justify-center rounded-md bg-white text-gray-800 outline-transparent transition-colors duration-100 hover:bg-blue-50 hover:text-blue-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800/50 active:scale-[0.98] active:bg-blue-100 active:text-blue-950"
        >
          <CaretRight class="size-5" />
        </Calendar.NextButton>
      {/if}
    </Calendar.Header>
    <div class="flex flex-col pt-4">
      {#each months as month, i (i)}
        <Calendar.Grid class="w-full border-collapse select-none">
          <Calendar.GridHead>
            <Calendar.GridRow class="mb-2 flex w-full justify-between">
              {#each weekdays as day (day)}
                <Calendar.HeadCell
                  class="font-nunito w-10 rounded-md text-xs font-normal text-gray-950/50"
                >
                  <div>{day.slice(0, 2)}</div>
                </Calendar.HeadCell>
              {/each}
            </Calendar.GridRow>
          </Calendar.GridHead>
          <Calendar.GridBody>
            {#each month.weeks as weekDates (weekDates)}
              <Calendar.GridRow class="flex w-full justify-between">
                {#each weekDates as date (date)}
                  <Calendar.Cell
                    {date}
                    month={month.value}
                    class="relative size-10 text-center text-sm"
                  >
                    <Calendar.Day
                      class="group font-nunito relative inline-flex size-10 flex-col items-center justify-center rounded-md bg-transparent p-0 text-sm font-normal whitespace-nowrap text-gray-800 outline-transparent transition-colors duration-100 hover:bg-blue-50 hover:text-blue-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950/50 active:bg-blue-100 active:text-blue-950 data-disabled:pointer-events-none data-disabled:text-gray-800/25 data-outside-month:pointer-events-none data-selected:bg-blue-950 data-selected:font-semibold data-selected:text-white data-unavailable:text-gray-800/50 data-unavailable:line-through data-unavailable:hover:bg-transparent"
                    >
                      <div
                        class="absolute top-1 hidden size-1 rounded-full bg-blue-950 group-data-selected:bg-white group-data-today:block"
                      ></div>
                      {date.day}
                    </Calendar.Day>
                  </Calendar.Cell>
                {/each}
              </Calendar.GridRow>
            {/each}
          </Calendar.GridBody>
        </Calendar.Grid>
      {/each}
    </div>
  {/snippet}
</Calendar.Root>
