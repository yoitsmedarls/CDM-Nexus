<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  let { data }: { data: PageData } = $props();
  function getHDImage() {
    return `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}`;
  }
  onMount(() => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  });
</script>

<h1 class="font-poppins py-9 pl-6 text-center text-3xl font-bold">
  AVAILABLE COURSES
</h1>
<nav class="px-auto py-auto container mx-auto w-full">
  <ul
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5"
  >
    {#each data.queriedCourses as course}
      <li
        class="flex h-full flex-col overflow-hidden rounded-lg border shadow-md"
      >
        <img
          src={getHDImage()}
          alt={course.title}
          class="h-48 w-full object-cover"
          onerror={(event) => {
            const img = event.target as HTMLImageElement;
            if (img) img.src = '/fallback.jpg';
          }}
        />
        <a
          class="flex flex-grow items-center justify-center bg-blue-500 p-1 text-gray-900
              transition-colors hover:bg-blue-700 active:bg-blue-900"
          href="/course-list/library/{course.slug}"
        >
          <div class="p-4">
            <h3
              class="font-merriweather text-center text-lg font-semibold break-words whitespace-normal"
            >
              {course.title}
            </h3>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</nav>
