<script lang="ts">
  import Accordion from '$lib/components/ui/Accordion.svelte';
  import AlertDialog from '$lib/components/ui/AlertDialog.svelte';
  import Avatar from '$lib/components/ui/Avatar.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Checkbox from '$lib/components/ui/Checkbox.svelte';
  import Calendar from '$lib/components/ui/Calendar.svelte';
  import Collapsible from '$lib/components/ui/Collapsible.svelte';
  import Combobox from '$lib/components/ui/Combobox.svelte';
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

<main class="bg-dotted grow flex-col justify-start p-2">
  <Accordion
    type="multiple"
    items={[
      { title: 'Item 1', content: 'Content 1' },
      { title: 'Item 2', content: 'Content 2' },
    ]}
  />
  <AlertDialog
    action="?action"
    buttonText="Open Dialog"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    title="Dialog"
  />
  <Avatar
    src="https://github.com/yoditsmedarls.png"
    alt="yoitsmedarls"
    fallback="JDU"
  />
  <Button icon="close"></Button>
  <Calendar variant="default" />
  <Calendar variant="withPicker" />
  <Checkbox id="test" labelText="Enable" />
  <Collapsible label="Open">
    <Button>Test 1</Button>
    <Button>Test 2</Button>
    <Button>Test 3</Button>
    <Button>Test 4</Button>
  </Collapsible>
  <Combobox
    type="single"
    items={[
      { value: 'item1', label: 'Item 1' },
      { value: 'item2', label: 'Item 2' },
    ]}
  />

  <div class="min-h-screen"></div>
</main>
