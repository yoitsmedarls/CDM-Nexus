<script>
  import About from '$lib/components/landing-page/About.svelte';
  import Encourage from '$lib/components/landing-page/Encourage.svelte';
  import Footer from '$lib/components/landing-page/Footer.svelte';
  import Header from '$lib/components/landing-page/Header.svelte';
  import Hero from '$lib/components/landing-page/Hero.svelte';
  import Join from '$lib/components/landing-page/Join.svelte';
  import Stats from '$lib/components/landing-page/Stats.svelte';
  import Tutors from '$lib/components/landing-page/Tutors.svelte';
</script>

<main class="bg-dotted flex grow flex-col">
  <Hero />
  <!-- <About />
  <Tutors />
  <Encourage />
  <Stats />
  <Join /> -->
  <Footer />
</main>

<style>
  .bg-dotted {
    background-image: radial-gradient(
      circle at center,
      #06266560,
      transparent 2.5%
    );
    background-size: 4em 4em;
    background-position: center;
  }
</style>
