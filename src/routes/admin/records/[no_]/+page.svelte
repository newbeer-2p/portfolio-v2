<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { getRecordInput, getRecordLayout } from '$lib/utils/records.js';
	import Loading from '@components/Loading.svelte';
	import FormReport from '@components/form/FormReport.svelte';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';

  export let data, form

  $: if (browser && form) {
    if (form.deleted) goto("/admin/records")
  }

  /** @type {import('@components/form/InputForm.svelte').Inputs} */
  $: inputs = getRecordInput(data.record)

  /** @type {import('@components/form/InputForm.svelte').InputLayouts} */
  const inputLayouts = getRecordLayout()

  /** @type {import('@components/form/Form.svelte').ButtonForm} */
  const formButton = {
    cancel: {
      text: "ยกเลิก",
      type: "button",
      onClick: () => {
        isEdit = false
      }
    },
    submit: {
      text: "บันทึก",
      type: "submit",
      onClick: () => {
        isEdit = false
      }
    }
  }

  const modalStore = getModalStore()
  const toastStore = getToastStore()

  let deleteLoading = false

  /** @type {import('@components/form/Form.svelte').ButtonForm} */
  const reportButton = {
    delete: {
      text: "ลบ",
      type: "submit",
      class: "!bg-error-400",
      onClick: async (action) => {
        const confirmed = await new Promise((resolve) => {
          modalStore.trigger({
            type: "confirm",
            body: `ต้องการจะลบผลงานเลขที่ ${data.record.no_} ใช่หรือไม่`,
            title: "ลบผลงาน",
            buttonTextConfirm: "ลบ",
            buttonTextCancel: "ไม่",
            response: (r) => resolve(r)
          })
        })
        if (confirmed) {
          deleteLoading = true
          return async function({ update, result }) {
            await update()
            deleteLoading = false
            if (result.type == "success") {
              toastStore.trigger({
                message: result.data.message,
                classes: "bg-success-400"
              })

              goto("/admin/records")
            }
          }
        } else action.cancel()
      }
    },
  }


  /** @type {import('@components/form/FormHeader.svelte').FormHeader} */
  const header = {
    name: `${data.record.no_}: ${data.record.name}`
  }

  /** @type {import('@components/form/InputForm.svelte').InputData} */
  let recordData = {}
  let isEdit = false
  let loading = false
</script>

<svelte:head>
  <title>{data.record.name} | Admin</title>
</svelte:head>

<Loading text="กำลังบันทึก..." {loading} />
<Loading text="กำลังลบ..." loading={deleteLoading} />

<div class="p-4">
  <FormReport {header} {inputs} {inputLayouts} {formButton} {reportButton} bind:data={recordData} bind:isEdit />
</div>
