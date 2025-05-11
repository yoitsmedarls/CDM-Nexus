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
      duration={100}
      scrollValue={App.scroll.y}
      scrollTrigger={250}
    >
      <Logo class={{ nexus: 'pl-1 text-lg md:pl-2 md:text-2xl' }} />
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
                  : `/${data.user.role}`}
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
          {#each options as option}
            <NavigationMenuItem {option} />
          {/each}
          <Separator
            class="scale-y-75 bg-blue-950/25"
            orientation="vertical"
            decorative
          />
          {#if data.user}
            <Avatar user={data.user} />
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
  </LandingSection>
</main>

{#if App.scroll.y > App.viewport.height}
  <ScrollToTop duration={100} onclick={() => (App.scroll.y = 0)} />
{/if}
