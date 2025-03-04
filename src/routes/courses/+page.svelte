<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<h1 class="py-5 pl-2 text-4xl font-bold">All Courses</h1>
<nav class="p-2">
  <ul class="flex w-auto flex-col gap-y-2">
    {#each data.queriedCourses as course (course.id)}
      <li class="flex">
        <a
          class="w-full truncate rounded-md bg-slate-200 py-5 pl-2 hover:bg-slate-300 active:bg-slate-400"
          href="/courses/{course.slug}">{course.id}: {course.title}</a
        >
      </li>
    {/each}
  </ul>
</nav>
