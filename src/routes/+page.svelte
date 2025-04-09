<script>
  import Hero from '$lib/components/landing-page/Hero.svelte';

  // TODO: Implement the components below:
  // import Courses from '$lib/components/landing-page/Courses.svelte';
  // import About from '$lib/components/landing-page/About.svelte';
  // import Tutors from '$lib/components/landing-page/Tutors.svelte';
  // import Encourage from '$lib/components/landing-page/Encourage.svelte';
  // import Join from '$lib/components/landing-page/Join.svelte';
  import Footer from '$lib/components/landing-page/Footer.svelte';
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
  <Hero />
  <!-- <Courses /> -->
  <!-- <About /> -->
  <!-- <Tutors /> -->
  <!-- <Encourage /> -->
  <!-- <Join /> -->
  <Footer />
</main>
