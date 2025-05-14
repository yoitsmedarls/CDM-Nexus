<script lang="ts">
  import { App } from '$lib/components/global/App.svelte';

  import HeaderSidebar from '$lib/components/routes/admin-tutor/HeaderSidebar.svelte';
  import Logo from '$lib/components/ui/Logo.svelte';
  import HamburgerMenu from '$lib/components/ui/hamburger-menu/HamburgerMenu.svelte';
  import HamburgerMenuOption from '$lib/components/ui/hamburger-menu/HamburgerMenuOption.svelte';
  import Separator from '$lib/components/ui/Separator.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import NavigationMenu from '$lib/components/ui/navigation-menu/NavigationMenu.svelte';
  import NavigationMenuItem from '$lib/components/ui/navigation-menu/NavigationMenuItem.svelte';
  import AccountCard from '$lib/components/ui/AccountCard.svelte';
  import type { LayoutProps } from './$types';
  import AccountDropdown from '$lib/components/ui/AccountDropdown.svelte';
  import NavigationMenuDropdown from '$lib/components/ui/navigation-menu/NavigationMenuDropdown.svelte';
  import ScrollToTop from '$lib/components/ui/ScrollToTop.svelte';
  import SidebarOption from '$lib/components/ui/sidebar/SidebarOption.svelte';
  import Avatar from '$lib/components/ui/Avatar.svelte';
  import { goto } from '$app/navigation';

  let options: {
    text: string;
    slug: string;
  }[] = $state([
    {
      text: 'Courses',
      slug: '/admin/manage/courses',
    },
    {
      text: 'Formula Cards',
      slug: '/admin/manage/formula-cards',
    },
    {
      text: 'Exams',
      slug: '/admin/manage/exams',
    },
    {
      text: 'Students',
      slug: '/admin/manage/students',
    },
    {
      text: 'Tutors',
      slug: '/admin/manage/tutors',
    },
    {
      text: 'Schedules',
      slug: '/admin/manage/schedules',
    },
  ]);

  let { data, children }: LayoutProps = $props();
</script>

<div class="flex grow flex-col xl:flex-row">
  <HeaderSidebar
    duration={200}
    scrollValue={App.scroll.y}
    scrollTrigger={100}
    viewportWidth={App.viewport.width}
    viewportTrigger={App.breakpoints.xl}
  >
    <Logo class={{ nexus: 'pl-1 text-lg md:pl-2 md:text-2xl xl:text-3xl' }} />
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
        <form
          method="post"
          action="/admin?/logout"
          class="grid w-full grid-cols-1 gap-2 p-4"
        >
          {#if data.user}
            <AccountCard user={data.user} />
            <Button
              variant="destructive"
              type="submit"
              class={{ button: 'w-full', span: 'text-sm' }}
            >
              Log out
            </Button>
          {/if}
        </form>
      </HamburgerMenu>
    {:else if App.viewport.width < App.breakpoints.xl}
      {#key App.viewport.width < App.breakpoints.lg}
        <NavigationMenu menuDuration={200}>
          {#if App.viewport.width < App.breakpoints.lg}
            <NavigationMenuDropdown trigger="Navigate" {options} />
          {:else}
            {#each options as option (option.slug)}
              <NavigationMenuItem {option} />
            {/each}
          {/if}
          <Separator
            class="scale-y-75 bg-blue-950/25"
            orientation="vertical"
            decorative
          />
          {#if data.user}
            <AccountDropdown user={data.user} duration={100} />
          {/if}
        </NavigationMenu>
      {/key}
    {:else}
      <div class="flex grow flex-col justify-between">
        <div class="flex flex-col justify-start gap-2">
          <Separator
            orientation="horizontal"
            class="scale-x-[0.95] bg-blue-950/10"
            decorative
          />
          <nav class="flex flex-col">
            {#each options as option (option.slug)}
              <SidebarOption {option} />
            {/each}
          </nav>
        </div>
        <div class="flex flex-col justify-end gap-4">
          {#if data.user}
            <div class="flex flex-row">
              <Separator
                orientation="vertical"
                class="mr-1.5 ml-0 scale-y-[0.85] bg-blue-950/10"
                decorative
              />
              <div
                class="overflow flex w-full flex-col justify-center pr-2 pl-1"
              >
                <a
                  href="/admin/account"
                  class="font-poppins flex flex-col rounded-md text-left text-base leading-normal font-medium text-balance overflow-ellipsis whitespace-nowrap text-gray-800 outline-0 transition-colors duration-100 hover:cursor-pointer not-disabled:hover:text-blue-800 focus-visible:underline focus-visible:underline-offset-2 active:scale-[0.99] not-disabled:active:text-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {data.user.username}
                  <span
                    class="font-nunito pb-1 text-left text-xs leading-none font-light"
                  >
                    {data.user.cdmEmail}
                  </span>
                </a>
              </div>
            </div>
            <Button
              variant="destructive"
              type="submit"
              class={{ button: 'w-full', span: 'text-sm' }}
            >
              Log out
            </Button>
          {/if}
        </div>
      </div>
    {/if}
  </HeaderSidebar>
  <div class="flex grow flex-col p-2">
    {@render children()}
  </div>
</div>

{#if App.scroll.y > App.viewport.height / 2}
  <ScrollToTop duration={100} onclick={() => (App.scroll.y = 0)} />
{/if}
