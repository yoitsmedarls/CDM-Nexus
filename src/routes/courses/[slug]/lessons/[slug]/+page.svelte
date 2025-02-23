<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<h1 class="py-5 pl-2 text-4xl font-bold">{data.queriedLesson?.title}</h1>
<p class="pl-2 text-xl">{data.queriedLesson?.description}</p>
