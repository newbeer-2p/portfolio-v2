<script context="module">
  /**
   * 
   * @typedef {import("@sveltejs/kit").SubmitFunction} Enhance
   * 
   * @typedef {object} FormAction
   * @property {string} text
   * @property {"submit"|"button"|"reset"} [type="submit"]
   * @property {string} [action]
   * @property {boolean} [reset=true]
   * @property {string} [class]
   * @property {enhance|MouseEvent} [onClick]
   * 
   * @typedef {Record<string, FormAction>} ButtonForm
   */
  export {};
</script>

<script>
  import { enhance } from '$app/forms';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import FormHeader from './FormHeader.svelte';
	import InputForm from './InputForm.svelte';

  /** @type {import('./InputForm.svelte').Inputs} */
  export let inputs;
  /** @type {import('./InputForm.svelte').InputLayouts} */
  export let inputLayouts;
  /** @type {ButtonForm} */
  export let button = {};

  /** @type {import('./InputForm.svelte').InputData}*/
  export let data = {};

  export let loading = false

  /** @type {import('./FormHeader.svelte').FormHeader} */
  export let header = {}

  
  const toastStore = getToastStore();

  /** @type {import('@sveltejs/kit').SubmitFunction} */
  function onSubmit(action) {
    const key = action.submitter?.getAttribute("key")
    const btn = button[key]
    return async function({ update, result }) {
      loading = true
      await update({reset: btn?.reset ?? true})
      loading = false
      if (key) btn?.onClick(action)

      let toast = {
          message: result.data.message ?? "",
          timeout: 5000,
          classes: ""
        }
      if (result.type == "success") {
        toast.classes = "bg-success-500"
      } else if (result.type == "failure") {
        toast.classes = "bg-error-500"
      } else {
        toast.classes = "bg-primary-500"
      }
      if (result.data.message)
        toastStore.trigger(toast)
    }
  }
</script>

<form method="post" use:enhance={onSubmit} action="?/update">
  <FormHeader {header} />
  <InputForm editable={true} bind:data {inputLayouts} {inputs} />
  {#if Object.keys(button).length}
    <div class="flex justify-end gap-2 my-5">
      {#each Object.keys(button) as key}
      {@const btn = button[key]}
        <button
          type={btn.type ?? "submit"}
          class={`btn ${key === 'cancel' ? 'bg-gray-400' : 'bg-primary-500'} ${
            btn.class ?? ''
          }`}
          formaction={btn.action?.startsWith("?/") ? btn.action : `?/${btn.action ?? key}`}
          key={key}
          on:click={btn.type == "submit" || btn.type == undefined ? onSubmit : btn.onClick}
        >{btn.text ?? key}</button>
      {/each}
    </div>
  {:else}
    <div class="mt-4 flex justify-end">
      <button type="submit" class="btn bg-primary-500">ส่ง</button>
    </div>
  {/if}
</form>
