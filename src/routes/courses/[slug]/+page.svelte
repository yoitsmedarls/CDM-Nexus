<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let midtermLesson = data.queriedLessons.filter(filteredLesson => filteredLesson.term === 'midterm');
  let finalsLesson = data.queriedLessons.filter(filteredLesson => filteredLesson.term === 'finals');
  
  let showMidterms = $state(true);
  let showFinals = $state(true);

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
        <div class="flex items-center space-x-2 h-10 w-full">
          <h2 class="font-bold font-merriweather">MIDTERM</h2>
          <button class="text-sm" onclick={() => showMidterms = !showMidterms}>
          {showMidterms ? "Hide" : "Show"}
          </button>
        </div>
          {#if showMidterms}
           {#each midtermLesson as lesson}
                 <li class="flex p-2">
                   <a
                    class="w-full truncate rounded-md bg-slate-200 py-5 pl-2 hover:bg-slate-300 active:bg-slate-400"
                    href="/courses/{data.queriedCourse.slug}/lessons/{lesson.slug}"
                   >{lesson.title}</a>

                    <form method="POST" action="?/deleteLesson">
                      <input type="hidden" name="lessonId" value={lesson.id} />
                      <button type="submit" class="text-red-500 ml-2">Delete</button>
                    </form>

                  </li>
            {/each}
          {/if}
      </section>

      <section class="finals-Lessons">
        <div class="flex items-center space-x-2 h-10 w-full">
          <h2 class="font-bold font-merriweather">FINALS</h2>
          <button class="text-sm" onclick={() => showFinals = !showFinals}>
          {showFinals ? "Hide" : "Show"}
          </button>
        </div>
          {#if showFinals}
            {#each finalsLesson as lesson}
              <li class="flex p-2">
                   <a class="w-full truncate rounded-md bg-slate-200 py-5 pl-2 hover:bg-slate-300 active:bg-slate-400"
                    href="/courses/{data.queriedCourse.slug}/lessons/{lesson.slug}"
                   >{lesson.title}</a>

                  <form method="POST" action="?/deleteLesson">
                     <input type="hidden" name="lessonId" value={lesson.id} />
                     <button type="submit" class="text-red-500 ml-2">Delete</button>
                  </form>

              </li>
            {/each}
          {/if}
        </section>

      </ol>
  </section>
{/if}


<form method="post" action="?/addLesson" class="flex flex-col gap-2">
  <input type="text" name="title" placeholder="Lesson Title" required class="border p-2" />
  <textarea name="description" placeholder="Lesson Description" required class="border p-2"></textarea>
  <select name="term" required class="border p-2">
    <option value="midterm">Midterm</option>
    <option value="finals">Finals</option>
  </select>
  <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Add Lesson</button>
</form>

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
