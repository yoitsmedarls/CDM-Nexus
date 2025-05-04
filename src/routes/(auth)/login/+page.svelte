<script lang="ts">
  import type { PageProps } from './$types';

  import { page } from '$app/state';

  import AuthLayout from '$lib/components/auth/AuthLayout.svelte';

  import Form from '$lib/components/auth/form/Form.svelte';
  import FormInput from '$lib/components/auth/form/FormInput.svelte';
  import FormSubmit from '$lib/components/auth/form/FormSubmit.svelte';

  let processing = $state(false);

  let { form }: PageProps = $props();
</script>

<svelte:head>
  <title>Log in | CDM Nexus</title>
  <meta name="description" content="Login to CDM Nexus." />
</svelte:head>

<AuthLayout>
  <Form
    title="Log in"
    redirectTo={page.url.search}
    message={form?.message}
    authSwitcher="/signup"
    authSwitcherText="Don't have an account?"
    {processing}
  >
    <FormInput type="text" label="Username" disabled={processing} />
    <FormInput type="password" label="Password" disabled={processing} />
    <FormSubmit text="Log in" disabled={processing} />
  </Form>
</AuthLayout>
