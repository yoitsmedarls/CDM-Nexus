<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  //Filter lessons from term: midterm | finals
  let midtermLesson = data.queriedLessons.filter(filteredLesson => filteredLesson.term === 'midterm');
  let finalsLesson = data.queriedLessons.filter(filteredLesson => filteredLesson.term === 'finals');
  
</script>

{#if data.queriedCourse}
  <h1 class="py-5 pl-2 text-4xl font-bold font-poppins">{data.queriedCourse?.title}</h1>

  <section class="course-info">
    <table class="flex p-1 pb-3 border-b-2 border-black">
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

 <section class="lessons-list p-2 pt-4">
    <ol class="flex w-auto flex-col gap-y-2 not-[]:">

      <section class="midterm-lessons">
          <h2 class="font-bold font-merriweather">MIDTERM</h2>
           {#each midtermLesson as lesson}
                 <li class="flex pt-1 pb-1">
                   <a
                    class="w-full truncate rounded-md bg-slate-200 py-5 pl-2 hover:bg-slate-300 active:bg-slate-400"
                    href="/courses/{data.queriedCourse.slug}/lessons/{lesson.slug}"
                   >{lesson.title}</a>
                  </li>
            {/each}
      </section>

      <section class="finals-Lessons">
          <h2 class="font-bold font-merriweather">FINALS</h2>
            {#each finalsLesson as lesson}
              <li class="flex pt-1 pb-1">
                  <a 
                  class="w-full truncate rounded-md bg-slate-200 py-5 pl-2 hover:bg-slate-300 active:bg-slate-400"
                  href="/courses/{data.queriedCourse.slug}/lessons/{lesson.slug}"
                  >{lesson.title}</a>
              </li>
            {/each}
        </section>

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
