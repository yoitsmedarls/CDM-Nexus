<script>
  import About from '$lib/components/landing-page/About.svelte';
  import Courses from '$lib/components/landing-page/Courses.svelte';
  import Encourage from '$lib/components/landing-page/Encourage.svelte';
  import Footer from '$lib/components/landing-page/Footer.svelte';
  import Hero from '$lib/components/landing-page/Hero.svelte';
  import Join from '$lib/components/landing-page/Join.svelte';
  import Tutors from '$lib/components/landing-page/Tutors.svelte';
</script>

<svelte:head>
  <title>CDM Nexus</title>
  <meta
    name="description"
    content="Welcome to CDM Nexus! Browse courses made by our student-tutors, answer quizzes and mock-exams, and access valuable formula cards to prepare for your next exam."
  />
  <meta
    name="keywords"
    content="CDM Nexus, Mathematics, Online Courses, Tutoring Program"
  />
</svelte:head>

<main class="bg-dotted flex grow flex-col justify-between">
  <Hero />
  <!-- <Courses /> -->
  <!-- <Tutors /> -->
  <!-- <About /> -->
  <!-- <Encourage /> -->
  <!-- <Join /> -->
  <Footer />
</main>
