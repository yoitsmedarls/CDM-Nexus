<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

{#if data.queriedCourse}
  <h1 class="py-5 pl-2 text-4xl font-bold">{data.queriedCourse?.title}</h1>

  <section class="course-info">
    <table class="flex p-1">
      <tbody>
        <tr>
          <th>Course Code: </th>
          <td>{data.queriedCourse?.id}</td>
        </tr>
        <tr>
          <th>Description: </th>
          <td>{data.queriedCourse?.description}</td>
        </tr>
        <tr>
          <th>Date Modified: </th>
          <td>
            {data.queriedCourse?.dateModified.toLocaleDateString(
              navigator.language,
              {
                dateStyle: 'medium',
              }
            )}
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="lessons-list p-2">
    <ol class="flex w-auto flex-col gap-y-2">
      {#each data.queriedLessons as lesson}
        <li class="flex">
          <a
            class="w-full truncate rounded-md bg-slate-200 py-5 pl-2 hover:bg-slate-300 active:bg-slate-400"
            href="/courses/{data.queriedCourse.slug}/lessons/{lesson.slug}"
            >{lesson.title}</a
          >
        </li>
      {/each}
    </ol>
  </section>
{/if}

<style>
  th {
    display: flex;
    min-width: max-content;
    height: max-content;
    text-align: left;
    align-items: start;
    padding-right: 1em;
  }
  tr > * {
    min-height: 2em;
  }
</style>
