<script lang="ts">
  import type { PageProps } from './$types';
  import AuthLayout from '$lib/components/auth/AuthLayout.svelte';
  import Form from '$lib/components/auth/Form.svelte';
  import FormInput from '$lib/components/auth/FormInput.svelte';
  import FormSubmit from '$lib/components/auth/FormSubmit.svelte';

  let processing = $state(false);

  let { form, data }: PageProps = $props();
</script>

<AuthLayout>
  <Form
    title="Sign up"
    redirectTo={data.redirectTo}
    message={form?.message}
    authSwitcher="/login"
    authSwitcherText="Have an account?"
    {processing}
  >
    <FormInput type="text" label="Full Name" disabled={processing} />
    <FormInput type="text" label="CDM Email" disabled={processing} />
    <FormInput type="text" label="Username" disabled={processing} />
    <FormInput type="password" label="Password" disabled={processing} />
    <FormSubmit text="Sign up" disabled={processing} />
  </Form>
</AuthLayout>
