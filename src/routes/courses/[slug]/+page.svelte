<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<h1 class="py-5 pl-2 text-4xl font-bold">{data.course.title}</h1>

<section class="course-info">
  <table class="flex p-1">
    <tbody>
      <tr>
        <th>Course Code: </th>
        <td>{data.course.id}</td>
      </tr>
      <tr>
        <th>Description: </th>
        <td>{data.course.description}</td>
      </tr>
      <tr>
        <th>Date Modified: </th>
        <td>
          {data.course.dateModified.toLocaleDateString(navigator.language, {
            dateStyle: 'medium',
          })}
        </td>
      </tr>
    </tbody>
  </table>
</section>

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
