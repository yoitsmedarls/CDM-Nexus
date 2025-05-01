<script lang="ts">
  import Button from '$lib/components/global/Button.svelte';
</script>

<svelte:head>
  <title>CDM Nexus</title>
  <meta
    name="description"
    content="Welcome to CDM Nexus! Browse courses made by our student-tutors, answer quizzes and mock exams, and access valuable formula cards to prepare for your next exam."
  />
  <meta
    name="keywords"
    content="CDM Nexus, Mathematics, Online Courses, Tutoring Program"
  />
</svelte:head>

<main class="bg-dotted flex grow flex-col justify-between">
  <div id="buttons" class="flex grow flex-col gap-4 p-8">
    <Button href="#home">Home</Button>
    <Button popovertarget="test" variant="primary">Hello, world!</Button>
    <Button variant="secondary">Hello, world!</Button>
    <Button variant="outline">Hello, world!</Button>
    <Button variant="destructive">Hello, world!</Button>
    <Button variant="ghost">Hello, world!</Button>
    <Button variant="underline">Hello, world!</Button>
    <Button variant="outline" icon="close"></Button>
    <Button variant="outline" icon="menu">Test</Button>
  </div>
  <div
    class="fixed inset-0 bottom-0 h-1/2 w-full bg-black/50 p-4 open:flex open:flex-col open:justify-end"
    id="test"
    popover
  >
    <Button
      href="#homez"
      usegoto
      popovertarget="test"
      popovertargetaction="hide"
      variant="destructive"
      class="bg-orange-700">homez</Button
    >
  </div>
</main>
