<script>
	import FormHeader from './FormHeader.svelte';
import InputForm from './InputForm.svelte';
  // @ts-ignore
  import _ from "lodash"

  /** @type {import('./InputForm.svelte').Inputs} */
  export let inputs;
  /** @type {import('./InputForm.svelte').InputLayouts} */
  export let inputLayouts;
  /** @type {import('./Form.svelte').FormHeader} */
  export let header = {};

  const reportInput = _.cloneDeep(inputs)
  
  for (const [key, value] of Object.entries(reportInput)) {
    const newValue = {...value}
    if (["select", "date"].includes(value.type)) newValue.type = "text"
    reportInput[key] = newValue
  }

  /** @type {import('./InputForm.svelte').InputData}*/
  export let data = {};
</script>

<FormHeader {header} />
<InputForm inputs={reportInput} {inputLayouts} bind:data editable={false} />
