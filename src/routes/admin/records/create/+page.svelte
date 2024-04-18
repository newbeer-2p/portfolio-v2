<script>
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import { getRecordInput, getRecordLayout } from "$lib/utils/records";
	import Form from "@components/form/Form.svelte";

  export let form

  const inputs = getRecordInput()
  const inputLayouts = getRecordLayout()
  const header = {
    name: "สร้างผลงานใหม่"
  }

  let data = {}

  $: if (browser && form) {
    if (form.created) goto(`/admin/records/${form.no_}`)
  }

</script>

<div class="p-5">
  <Form {header} {inputs} {inputLayouts} bind:data />
</div>