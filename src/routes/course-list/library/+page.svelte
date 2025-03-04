<script lang="ts">
  import type { PageData } from './$types';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  let { data }: { data: PageData } = $props();

  const isGridView = writable(true); // Default to grid view
  const searchQuery = writable('');
  const showEdit = writable(false);

  function toggleEditMenu() {
    showEdit.update((value) => !value);
  }

  onMount(() => {
    function handleClickOutside(event: MouseEvent) {
      const dropdown = document.getElementById('edit-dropdown');
      const button = document.getElementById('edit-button');

      if (
        dropdown &&
        button &&
        !dropdown.contains(event.target as Node) &&
        !button.contains(event.target as Node)
      ) {
        showEdit.set(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  function getHDImage() {
    return `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}`;
  }
</script>

<h1 class="font-poppins py-6 pl-6 text-center text-3xl font-bold text-blue-900">
  CURRENT COURSES
</h1>

<!-- Main Bar: Layout Toggle, Search, Actions -->
<div class="relative flex items-center justify-between gap-2 px-4 pb-4">
  <!-- Left Section: Layout Toggle & Search -->
  <div class="flex flex-grow items-center gap-2">
    <!-- Layout Toggle -->
    <div class="flex items-center rounded-2xl border bg-gray-300">
      <button
        class="rounded-l-full border-r p-2 transition hover:bg-gray-200"
        onclick={() => isGridView.set(false)}
        aria-label="List View"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#BD4C31"
        >
          <path
            d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z"
          />
        </svg>
      </button>
      <button
        class="rounded-r-full p-2 transition hover:bg-gray-200"
        onclick={() => isGridView.set(true)}
        aria-label="Grid View"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#BD4C31"
        >
          <path
            d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z"
          />
        </svg>
      </button>
    </div>

    <!-- Search Bar (Immediately to the right of layout toggle) -->
    <div class="relative w-72">
      <input
        type="text"
        class="w-full rounded-lg border p-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Search courses..."
        bind:value={$searchQuery}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#BD4C31"
        class="absolute top-1/2 right-2 -translate-y-1/2 transform"
      >
        <path
          d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
        />
      </svg>
    </div>
  </div>
  <!-- Sort, Add, Delete Buttons (Visible on larger screens) -->
  <div class="hidden gap-2 sm:flex">
    <button aria-label="Sort" class="bg-slate-300 px-2 py-1 hover:bg-slate-200"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#BD4C31"
        ><path
          d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z"
        /></svg
      ></button
    >
    <button aria-label="Edit" class="bg-slate-300 px-2 py-1 hover:bg-slate-200"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#BD4C31"
        ><path
          d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"
        /></svg
      ></button
    >
  </div>

  <!-- More Options (Visible on small screens) -->
  <button
    id="edit-button"
    class="rounded-md bg-gray-300 p-2 sm:hidden"
    onclick={toggleEditMenu}
  >
    <!-- More Options Icon -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#BD4C31"
    >
      <path
        d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"
      />
    </svg>
  </button>

  {#if $showEdit}
    <div
      id="edit-dropdown"
      class="absolute right-6 mt-2 rounded-md bg-white p-2 shadow-lg"
    >
      <button
        aria-label="Sort"
        class="block w-full px-4 py-2 text-left shadow-md transition hover:bg-gray-200"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#BD4C31"
          ><path
            d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z"
          /></svg
        >Sort</button
      >
      <button
        aria-label="Edit"
        class="block w-full px-4 py-2 text-left shadow-md transition hover:bg-gray-200"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#BD4C31"
          ><path
            d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"
          /></svg
        >Edit</button
      >
    </div>
  {/if}
</div>

<!-- Courses Display -->
<nav class="container mx-auto w-full">
  <ul class="gap-4" class:grid={$isGridView} class:list={!$isGridView}>
    {#each data.queriedCourses as course (course.id)}
      <li
        class="flex h-full flex-col overflow-hidden rounded-lg border shadow-md"
      >
        <img
          src={getHDImage()}
          alt={course.title}
          class="h-48 w-full object-cover"
          onerror={(event) => {
            const img = event.target as HTMLImageElement;
            img.src = '/fallback.jpg';
          }}
        />
        <a
          class="flex w-full flex-1 items-center justify-center bg-blue-500 p-4 text-gray-900
                transition hover:bg-blue-700 active:bg-blue-900"
          href={`/course-list/library/${course.slug}`}
          style="display: flex; flex-grow: 1; width: 100%;"
        >
          <h3
            class="font-merriweather w-full text-center text-lg font-semibold break-words whitespace-normal"
          >
            {course.title}
          </h3>
        </a>
      </li>
    {/each}
  </ul>
</nav>

<!-- Styles -->
<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  .list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .list li {
    flex-direction: row;
    align-items: center;
  }
  .list img {
    width: 150px;
    height: auto;
  }
</style>
