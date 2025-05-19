<script lang="ts">
  import type { PageProps } from './$types';

  import { App } from '$lib/components/global/App.svelte';

  import LandingHeader from '$lib/components/routes/landing/LandingHeader.svelte';
  import LandingSection from '$lib/components/routes/landing/LandingSection.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import HamburgerMenu from '$lib/components/ui/hamburger-menu/HamburgerMenu.svelte';
  import HamburgerMenuOption from '$lib/components/ui/hamburger-menu/HamburgerMenuOption.svelte';
  import Logo from '$lib/components/ui/Logo.svelte';
  import NavigationMenu from '$lib/components/ui/navigation-menu/NavigationMenu.svelte';
  import NavigationMenuItem from '$lib/components/ui/navigation-menu/NavigationMenuItem.svelte';
  import Separator from '$lib/components/ui/Separator.svelte';
  import Avatar from '$lib/components/ui/Avatar.svelte';
  import HeroBackdrop from '$lib/components/routes/landing/hero/HeroBackdrop.svelte';
  import Hero from '$lib/components/routes/landing/hero/Hero.svelte';
  import HeroText from '$lib/components/routes/landing/hero/HeroText.svelte';
  import ScrollToTop from '$lib/components/ui/ScrollToTop.svelte';
  import HeroImageLeft from '$lib/components/routes/landing/hero/HeroImageLeft.svelte';
  import HeroImageMain from '$lib/components/routes/landing/hero/HeroImageMain.svelte';
  import HeroImageRight from '$lib/components/routes/landing/hero/HeroImageRight.svelte';
  import HeroActionButton from '$lib/components/routes/landing/hero/HeroActionButton.svelte';
  import Footer from '$lib/components/routes/landing/footer/Footer.svelte';

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

  let { data }: PageProps = $props();
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
  <LandingSection
    id="hero-section"
    class={{
      section: 'h-svh max-h-[64rem]',
      div: 'max-w-[88rem]',
    }}
  >
    <LandingHeader
      duration={200}
      scrollValue={App.scroll.y}
      scrollTrigger={100}
    >
      <Logo href="/" class={{ nexus: 'pl-1 text-lg md:pl-2 md:text-2xl' }} />
      {#if App.viewport.width < App.breakpoints.md}
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
        <NavigationMenu menuDuration={200}>
          {#each options as option (option.slug)}
            <NavigationMenuItem {option} />
          {/each}
          <Separator
            class="scale-y-75 bg-blue-950/25"
            orientation="vertical"
            decorative
          />
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
    <Hero>
      <HeroBackdrop>
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
          <HeroActionButton href="/request">Start Now</HeroActionButton>
        {/snippet}
      </HeroText>
    </Hero>
  </LandingSection>
  <LandingSection
    id="footer-section"
    class={{
      div: 'max-w-[88rem]',
    }}
  >
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
          heading: 'Resources',
          options: [
            { name: 'Formula Cards', slug: 'formulas' },
            { name: 'Mock Exams', slug: 'exams' },
          ],
        },
        {
          // TODO: Add slugs
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

{#if App.scroll.y > App.viewport.height / 2}
  <ScrollToTop duration={100} onclick={() => (App.scroll.y = 0)} />
{/if}
