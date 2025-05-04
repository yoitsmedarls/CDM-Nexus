<script lang="ts">
  let {
    label = '',
    type,
    disabled = false,
  }: {
    label?: string;
    type: string;
    disabled?: boolean;
  } = $props();
</script>

<label class="block">
  <span class="font-poppins text-sm text-gray-800 md:text-base">{label}</span>
  <input
    {type}
    {disabled}
    name={label.toLowerCase().replace(/\s+/g, '')}
    class="font-nunito mt-1 block w-full rounded-sm border-1 border-gray-400 text-base outline-0 transition-all duration-100
        ease-in-out focus:border-blue-900 focus:ring-blue-900"
  />
</label>
