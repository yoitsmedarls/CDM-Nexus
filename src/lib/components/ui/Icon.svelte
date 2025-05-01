<script lang="ts">
  let {
    icon = '',
  }: {
    icon?: string | undefined;
  } = $props();
</script>

{#if icon}
  <span
    class={[
      'flex flex-col justify-center align-middle',
      icon === 'progress_activity' ? 'animate-spin' : '',
    ]}
  >
    <span class="material-symbols-rounded">
      {icon}
    </span>
  </span>
{/if}
