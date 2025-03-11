<script lang="ts">
  let {
    user,
  }: {
    user: { username: string; cdmEmail: string };
  } = $props();
</script>

<hgroup
  class="hgroup-bg-image flex flex-col border-b-1 border-gray-100 bg-cover bg-bottom p-4 transition-all duration-200 md:border-0 md:bg-gray-500 md:pt-12 md:pb-6 xl:rounded-t-md xl:pt-16"
>
  <h1
    class="font-poppins 2xs:text-[1.375rem] w-fit text-xl font-semibold text-gray-800 transition-all duration-100 sm:text-2xl md:text-gray-50 lg:text-3xl"
  >
    Welcome, {user.username}!
  </h1>
  <p
    class="font-nunito 2xs:text-[0.875rem] text-[0.75rem] font-semibold text-gray-800 transition-all duration-100 sm:text-base md:text-white lg:text-lg"
  >
    {user.cdmEmail}
  </p>
</hgroup>

<style>
  .hgroup-bg-image {
    @media (width >= 48rem) {
      background-image: url(https://picsum.photos/seed/cdm/1440/200/?blur=10);
    }
  }
</style>
