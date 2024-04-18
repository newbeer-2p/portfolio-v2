<script context="module">
  /**
   * @typedef {object} ReportEditButton
   * @property {string} [text]
   * @property {string} [class]
   * @property {MouseEvent & { currentTarget: EventTarget & HTMLButtonElement}} [onEdit]
  */
</script>

<script>
	import { enhance } from '$app/forms';
import Form from './Form.svelte'
	import Report from './Report.svelte';

  /** @type {import('./InputForm.svelte').Inputs} */
  export let inputs;
  /** @type {import('./InputForm.svelte').InputLayouts} */
  export let inputLayouts;
  /** @type {import('./Form.svelte').ButtonForm} */
  export let formButton = {};
  /** @type {import('./Form.svelte').ButtonForm} */
  export let reportButton = {};

  /** @type {import('./InputForm.svelte').InputData}*/
  export let data = {};
  
  /** @type {import('./FormHeader.svelte').FormHeader} */
  export let header = {};
  export let loading = false
  export let isEdit = false

  /** @type {ReportEditButton}*/
  export let editButton = {}

  function onEdit() {
    isEdit = true
  }

  const reportButtonKeys = Object.keys(reportButton)

  async function onSubmit(action) {
    const key = action.submitter.getAttribute("key")
    const btn = reportButton[key]
    if (btn) {
      await btn?.onClick(action)
    }
  }

</script>

{#if isEdit}
  <Form {header} {inputs} {inputLayouts} bind:data button={formButton} bind:loading />
{:else}
  <form method="post" use:enhance={onSubmit}>
    <Report {header} {inputs} {inputLayouts} bind:data />
    <div class="flex justify-end mt-5 gap-2">
      {#if reportButtonKeys.length}
      {#each reportButtonKeys as key}
      {@const btn = reportButton[key]}
        <button 
          type={btn.type ?? "submit"} 
          key={key}
          formaction={btn.action?.startsWith("?/") ? btn.action : `?/${btn.action ?? key}`} 
          class={`btn bg-primary-500 ${btn?.class ?? ""}`} 
          on:click={btn.type == "button" ? btn.onClick ?? onEdit : undefined}
        >
          {@html btn?.text ?? key}
        </button>
      {/each}
      {/if}
      <button type="button" class={`btn bg-warning-500 ${editButton?.class ?? ""}`} on:click={editButton?.onEdit ?? onEdit}>{@html editButton?.text ?? "แก้ไข"}</button>
    </div>
  </form>
{/if}