<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<nav class="sticky top-0 w-full bg-yellow-300 shadow-md">
  <div class="container mx-auto flex items-center justify-between p-4">
    <a href="/" class="flex items-center">
      <img src="/logo.png" alt="Logo" class="h-10 w-auto" />
    </a>

    <ul class="hidden space-x-6 md:flex">
      <li>
        <a href="/" class="text-2xl text-gray-700 hover:text-blue-500">Home</a>
      </li>
      <li>
        <a href="/about" class="text-2xl text-gray-700 hover:text-blue-500"
          >About</a
        >
      </li>
      <li>
        <a href="/courses" class="text-2xl text-gray-700 hover:text-blue-500"
          >Courses</a
        >
      </li>
      <li>
        <a href="/contact" class="text-2xl text-gray-700 hover:text-blue-500"
          >Contact</a
        >
      </li>
    </ul>

    <button id="menu-btn" class="text-gray-900 focus:outline-none md:hidden">
      ☰
    </button>
  </div>

  <div id="mobile-menu" class="hidden bg-slate-100 p-4 md:hidden">
    <a href="/" class="block py-2 text-xl text-gray-700 hover:text-blue-500"
      >Home</a
    >
    <a
      href="/about"
      class="block py-2 text-xl text-gray-700 hover:text-blue-500">About</a
    >
    <a
      href="/courses"
      class="block py-2 text-xl text-gray-700 hover:text-blue-500">Courses</a
    >
    <a
      href="/contact"
      class="block py-2 text-xl text-gray-700 hover:text-blue-500">Contact</a
    >
  </div>

  <script>
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  </script>
</nav>

{@render children()}

<footer
  class="fixed bottom-0 w-full bg-gray-800 p-3 text-center text-sm text-white"
>
  &copy; {new Date().getFullYear()} CDM Nexus. All rights reserved.
</footer>
