<script>
  import { App } from '$lib/components/global/App.svelte';

  import Section from '$lib/components/landing-page/Section.svelte';
  import Header from '$lib/components/landing-page/Header.svelte';
  import CDMNexus from '$lib/components/global/CDMNexus.svelte';

  import Hero from '$lib/components/landing-page/hero-section/Hero.svelte';
  import HeroText from '$lib/components/landing-page/hero-section/HeroText.svelte';
  import HeroBackground from '$lib/components/landing-page/hero-section/HeroBackground.svelte';

  import HamburgerMenu from '$lib/components/global/hamburger-menu/HamburgerMenu.svelte';
  import HamburgerMenuButton from '$lib/components/global/hamburger-menu/HamburgerMenuButton.svelte';
  import HamburgerMenuOptions from '$lib/components/global/hamburger-menu/HamburgerMenuOptions.svelte';
  import HamburgerLogin from '$lib/components/landing-page/action-buttons/HamburgerLogin.svelte';

  import NavigationBar from '$lib/components/global/navigation-bar/NavigationBar.svelte';
  import NavigationOptions from '$lib/components/global/navigation-bar/NavigationOptions.svelte';
  import NavigationLogin from '$lib/components/landing-page/action-buttons/NavigationLogin.svelte';

  import Footer from '$lib/components/landing-page/Footer.svelte';

  let options = $state([
    {
      text: 'Courses',
      slug: '#courses',
    },
    {
      text: 'Tutors',
      slug: '#tutors',
    },
    {
      text: 'About',
      slug: '#about',
    },
  ]);
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
  <Section maxheight={88} maxwidth={88} hscreen id="hero">
    <Header>
      <CDMNexus />
      {#if App.viewport.width < App.breakpoints.md}
        <HamburgerMenuButton transitionDuration={200} />
        <HamburgerMenu text="In this page:">
          <HamburgerMenuOptions {options} />
          <HamburgerLogin />
        </HamburgerMenu>
      {:else}
        <NavigationBar transitionDuration={200}>
          <NavigationOptions {options} />
          <NavigationLogin />
        </NavigationBar>
      {/if}
    </Header>
    <Hero>
      <HeroBackground transitionDuration={500} />
      <HeroText />
    </Hero>
  </Section>
  <!-- <Courses /> -->
  <!-- <About /> -->
  <!-- <Tutors /> -->
  <!-- <Encourage /> -->
  <!-- <Join /> -->
  <Footer />
</main>
