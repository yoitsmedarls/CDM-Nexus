<script lang="ts">
  let {
    icon = '',
    class: additionalStyles = '',
  }: {
    icon?: string | undefined;
    class?: string | undefined;
  } = $props();
</script>

{#if icon}
  <span
    class={[
      'flex flex-col justify-center align-middle',
      icon === 'progress_activity' ? 'animate-spin' : '',
      additionalStyles ? additionalStyles : '',
    ]}
  >
    <span class="material-symbols-rounded">
      {icon}
    </span>
  </span>
{/if}
