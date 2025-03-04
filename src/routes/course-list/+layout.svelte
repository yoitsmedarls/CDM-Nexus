<script lang="ts">
  import type { Snippet } from 'svelte';
  import { writable } from 'svelte/store';

  let { children }: { children: Snippet } = $props();
  let isMenuOpen = writable(false);
</script>

<!-- Main Container -->
<nav
  class={`fixed top-0 left-0 h-full bg-yellow-400 text-slate-800 shadow-lg transition-transform duration-300 ease-in-out
    ${$isMenuOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'} overflow-hidden md:w-64 md:translate-x-0`}
>
  <div class="flex justify-center p-5">
    <img src="/logo.png" alt="Logo" class="h-16 w-auto" />
  </div>

  <!-- Menu items should only be visible when sidebar is open -->
  <ul class={`space-y-6 px-5 ${$isMenuOpen ? 'block' : 'hidden'} md:block`}>
    <li>
      <a
        href="/dashboard"
        class="flex items-center gap-x-2 text-lg hover:text-blue-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#BD4C31"
          ><path
            d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h240v-560H200v560Zm320 0h240v-280H520v280Zm0-360h240v-200H520v200Z"
          /></svg
        > Dashboard
      </a>
    </li>
    <li>
      <a
        href="/tutors"
        class="flex items-center gap-x-2 text-lg hover:text-blue-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#BD4C31"
          ><path
            d="M218-381q-24 13-51 5.5T126-406q-17-29-6-60t43-42l337-112 36 71-318 168Zm22 261v-227l349-184-17-35 228-114 36 72-276 208v280H240Zm60-440q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Z"
          /></svg
        > Tutors
      </a>
    </li>
    <li>
      <a
        href="/course-list/library"
        class="flex items-center gap-x-2 text-lg hover:text-blue-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#BD4C31"
          ><path
            d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm0-80h480v-640h-80v280l-100-60-100 60v-280H240v640Zm0 0v-640 640Zm200-360 100-60 100 60-100-60-100 60Z"
          /></svg
        > Courses
      </a>
    </li>
    <li>
      <a
        href="/schedule"
        class="flex items-center gap-x-2 text-lg hover:text-blue-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#BD4C31"
          ><path
            d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"
          /></svg
        > Schedule
      </a>
    </li>
  </ul>

  <button
    class="absolute bottom-16 left-1/2 mx-auto flex w-5/6 -translate-x-1/2 transform items-center justify-center gap-x-2 rounded-lg bg-red-700 p-3 text-white transition hover:bg-red-600"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="white"
    >
      <path
        d="M420-160v-60h-160v-520h160v-60H200v640h220Zm160-120-43-43 102-102H360v-60h279l-102-102 43-43 160 160-160 160Z"
      />
    </svg>
    Logout
  </button>
</nav>

<div
  class={`flex-1 bg-slate-300 p-10 transition-all duration-300
      ${$isMenuOpen ? 'ml-64' : 'ml-0'} md:ml-64`}
>
  {@render children()}
</div>

<!-- Hamburger Button (Only on mobile) -->
<button
  class="fixed top-4 left-4 z-50 rounded bg-gray-900 p-2 text-white md:hidden"
  onclick={() => isMenuOpen.update((n) => !n)}
>
  ☰
</button>

<!-- Footer -->
<footer
  class="fixed bottom-0 w-full bg-gray-800 p-3 text-center text-sm text-white"
>
  &copy; {new Date().getFullYear()} CDM Nexus. All rights reserved.
</footer>
