<script lang="ts">
  // Type imports
  import type { PageProps } from './$types';

  // Global app state object
  import { App } from '$lib/components/global/App.svelte';

  // CDM Nexus UI components
  import Avatar from '$lib/components/ui/Avatar.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import HamburgerMenu from '$lib/components/ui/hamburger-menu/HamburgerMenu.svelte';
  import HamburgerMenuOption from '$lib/components/ui/hamburger-menu/HamburgerMenuOption.svelte';
  import Logo from '$lib/components/ui/Logo.svelte';
  import NavigationMenu from '$lib/components/ui/navigation-menu/NavigationMenu.svelte';
  import NavigationMenuItem from '$lib/components/ui/navigation-menu/NavigationMenuItem.svelte';
  import Separator from '$lib/components/ui/Separator.svelte';
  import ScrollToTop from '$lib/components/ui/ScrollToTop.svelte';

  // Route-specific components
  import Footer from '$lib/components/routes/landing/footer/Footer.svelte';
  import Hero from '$lib/components/routes/landing/hero/Hero.svelte';
  import HeroActionButton from '$lib/components/routes/landing/hero/HeroActionButton.svelte';
  import HeroBackdrop from '$lib/components/routes/landing/hero/HeroBackdrop.svelte';
  import HeroImageLeft from '$lib/components/routes/landing/hero/HeroImageLeft.svelte';
  import HeroImageMain from '$lib/components/routes/landing/hero/HeroImageMain.svelte';
  import HeroImageRight from '$lib/components/routes/landing/hero/HeroImageRight.svelte';
  import HeroText from '$lib/components/routes/landing/hero/HeroText.svelte';
  import LandingHeader from '$lib/components/routes/landing/LandingHeader.svelte';
  import LandingSection from '$lib/components/routes/landing/LandingSection.svelte';

  // Options for both the navigation and hamburger menu
  let options: {
    text: string;
    slug: string;
  }[] = $state([
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

  // Page props
  let { data }: PageProps = $props();
</script>

<!-- Page title, description, and keywords -->
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
  <!-- Each section in this landing page must be contained inside these LandingSection components for consistent styling. -->
  <LandingSection
    id="hero-section"
    class={{
      section: 'h-svh max-h-[64rem]',
      div: 'max-w-[88rem]',
    }}
  >
    <!-- A flexible header that is initially "mounted" on the landing section, but detaches and becomes a sticky header when scrolling down the page -->
    <LandingHeader
      duration={200}
      scrollValue={App.scroll.y}
      scrollTrigger={100}
    >
      <Logo href="/" class={{ nexus: 'pl-1 text-lg md:pl-2 md:text-2xl' }} />
      {#if App.viewport.width < App.breakpoints.md}
        <!-- On mobile devices, a hamburger menu is shown instead of a navigation menu. -->
        <HamburgerMenu
          title="Menu"
          description="Jump to a section."
          triggerDuration={200}
          menuDuration={200}
        >
          <div class="flex h-full grow flex-col overflow-y-auto px-2 py-2">
            {#each options as option, i (option.slug)}
              <HamburgerMenuOption {option} />
              {#if i < options.length - 1}
                <Separator orientation="horizontal" decorative />
              {/if}
            {/each}
          </div>
          <div class="flex w-full flex-row justify-between gap-2 p-4">
            <!-- Shows a button to go to their account profile if user is logged in. Otherwise, show login/signup buttons. -->
            {#if data.user}
              <Button
                variant="primary"
                href={data.user.role === 'student'
                  ? '/profile'
                  : `/${data.user.role}/dashboard`}
                class={{ button: 'w-full', span: 'text-sm' }}
              >
                Go to account
              </Button>
            {:else}
              <Button
                variant="outline"
                href="/login"
                class={{ button: 'w-full', span: 'text-sm' }}
              >
                Log in
              </Button>
              <Button
                variant="primary"
                href="/signup"
                class={{ button: 'w-full', span: 'text-sm' }}
              >
                Sign up
              </Button>
            {/if}
          </div>
        </HamburgerMenu>
      {:else}
        <!-- On desktop devices, a navigation menu is shown instead of a hamburger menu. -->
        <NavigationMenu menuDuration={200}>
          {#each options as option (option.slug)}
            <NavigationMenuItem {option} />
          {/each}
          <Separator
            class="scale-y-75 bg-blue-950/25"
            orientation="vertical"
            decorative
          />
          <!-- Similar to the hamburger menu, show an Avatar button to go to their account profile if the user is logged in. Otherwise, show login/signup buttons. -->
          {#if data.user}
            <Avatar
              href={data.user.role === 'student'
                ? '/profile'
                : `/${data.user.role}/account`}
              userRole={data.user.role}
            />
          {:else}
            <NavigationMenuItem
              option={{
                text: 'Log in',
                slug: '/login',
              }}
            />
            <Button
              variant="primary"
              href="/signup"
              class={{ span: 'text-base' }}
            >
              Sign up
            </Button>
          {/if}
        </NavigationMenu>
      {/if}
    </LandingHeader>
    <!-- The hero section takes up the available viewport height (minus the height of the landing header). -->
    <Hero>
      <!-- Backdrop contains three images, with the left and right images being blurred and elongated. -->
      <HeroBackdrop>
        <!-- Only show the main image on mobile devices. Show all images on wider devices. -->
        {#if App.viewport.width < App.breakpoints.xs}
          <HeroImageMain
            src="https://picsum.photos/seed/d/1440"
            duration={500}
          />
        {:else}
          <HeroImageLeft
            src="https://picsum.photos/seed/c/1440?blur=8"
            duration={500}
          />
          <HeroImageMain
            src="https://picsum.photos/seed/d/1440"
            duration={500}
          />
          <HeroImageRight
            src="https://picsum.photos/seed/m/1440?blur=8"
            duration={500}
          />
        {/if}
      </HeroBackdrop>
      <!-- Hero text that sits on top of the backdrop -->
      <HeroText>
        {#snippet mainText()}
          <span class="bg-white whitespace-break-spaces text-gray-800">
            Mathematics, <br />Made Easy.&nbsp;
          </span>
        {/snippet}
        {#snippet subText()}
          <span class="bg-white whitespace-break-spaces text-gray-800">
            Learn The Essentials <br />From
            <strong class="text-blue-950">Students</strong>
            Like You!&nbsp;
          </span>
        {/snippet}
        {#snippet actionButton()}
          <!-- Currently, the action button leads the students to the tutor request page, where they can request for an in-person tutoring session from the CDM Nexus Tutors. On future versions of the app, the button should redirect to the courses page. -->
          <HeroActionButton href="/request">Start Now</HeroActionButton>
        {/snippet}
      </HeroText>
    </Hero>
  </LandingSection>
  <!-- More landing sections should be added, highlighting the web app's functionality. -->
  <!-- Last section should be the footer, containing various links to various pages on the web app. -->
  <LandingSection
    id="footer-section"
    class={{
      div: 'max-w-[88rem]',
    }}
  >
    <!-- Current optgroups are limited to what the web app currently supports. In future versions, there should be links to CDM Nexus courses, formula cards, and mock exams, pages to request for or become a tutor, and more. -->
    <Footer
      optgroups={[
        {
          heading: 'CDM Nexus',
          options: [
            { name: 'Request a tutor', slug: '/request' },
            { name: 'Become a tutor', slug: '/apply' },
            { name: 'Browse courses', slug: '/courses' },
          ],
        },
        {
          // TODO: Add links to CDM Nexus Facebook page and email.
          heading: 'Connect',
          options: [
            { name: 'Facebook', slug: '' },
            { name: 'Email', slug: '' },
          ],
        },
      ]}
    />
  </LandingSection>
</main>

<!-- Shows a scroll to top button when scrolling down the page -->
{#if App.scroll.y > App.viewport.height / 2}
  <ScrollToTop duration={100} onclick={() => (App.scroll.y = 0)} />
{/if}
