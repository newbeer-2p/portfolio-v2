<script context="module">
  /**
   * @typedef {'text'|'image'|'image-text'|'date'|'select'|'lists'|'textarea'|'checkbox'|'number'|'toggle'|'hidden'|'link'|'subforms'|'subform'|'header'} InputType
   * @typedef {Record<string, Input>} Inputs
   * @typedef {string[][]} InputLayouts
   * 
   * @typedef {object} Subform
   * @property {Inputs} inputs
   * @property {InputLayouts} inputLayouts
   *
   * @typedef {object} Input
   * @property {string} label
   * @property {InputType} type
   * @property {boolean} [disabled=false]
   * @property {boolean} [readonly=false]
   * @property {boolean} [required=false]
   * @property {*} [value=""]
   * @property {(string|{name: string, value: string})[]} [data=""]
   * @property {string} [class=""]
   * @property {string|number} [colspan="auto"]
   * @property {'on'|'off'} [autocomplete='off']
   * @property {Function} [onClick]
   * @property {Function} [onChange]
   * @property {boolean} [flip=false]
   * @property {number} [step=1]
   * @property {number} [rows=3]
   * @property {string} [toggleOnText]
   * @property {string} [toggleOffText]
   * @property {Subform} [subform]
   * @property {boolean} [canMove=false]
   *
   * @typedef {Record<string, string|number|string[]|boolean|object>} InputData
   */
</script>

<script>
  // @ts-nocheck
	import { SlideToggle } from "@skeletonlabs/skeleton";
	import Image from "@components/Image.svelte";

  /** @type {Inputs} */
  export let inputs
  /** @type {InputData} */
  export let data = {}
  /** @type {InputLayouts} */
  export let inputLayouts
  export let editable = false
  export let subformed = false

  const hiddenInput = {}

  for (let key in inputs) {
    const input = inputs[key]
    if (["lists", "checkbox", "subforms"].includes(input.type))
      data[key] = data[key] ?? input.value ?? [];
    else if (["toggle"].includes(input.type))
      data[key] = data[key] ?? input.value ?? false
    else if (["subform"].includes(input.type))
      data[key] = data[key] ?? input.value ?? {};
    else
      if (subformed)
        data[key] = data[key] ?? ''
      else 
        data[key] = input.value ?? '';

    if (input.type == "hidden") hiddenInput[key] = input
  }

  const hiddenKeys = Object.keys(hiddenInput)

  /**
   * @param {Event} event
   * @param {string} key
   */
  function onAddLists(event, key) {
    const inputData = data[key]
    const input = inputs[key]
    if (Array.isArray(inputData)) {
      const init = input.type == "subforms" ? {} : ""
      data[key] = [...inputData, init]
    }
  }

  /**
   * @param {Event} event
   * @param {string} key
   * @param {number} index
   */
  function onRemoveLists(event, key, index) {
    const input = data[key]
    if (Array.isArray(input)) {
      if (input.length == 1) data[key] = []
      else data[key] = [...input.slice(0, index), ...input.slice(index + 1, input.length)]
    }
  }

  /**
   * @param {Event} event
   * @param {string} key
   * @param {number} index
   * @param {'up'|'down'} cmd
   */
  function onMoveList(event, key, index, cmd) {
    const numMovedIndex = index + (cmd == "down" ? 1 : -1)
    const item = data[key][index]
    const list = data[key]
    const listDeleted = [...list.slice(0, index), ...list.slice(index + 1, list.length)]
    console.log(item, listDeleted);
    const listMoved = [...listDeleted.slice(0, numMovedIndex), item, ...listDeleted.slice(numMovedIndex, listDeleted.length)]
    console.log(listMoved);
    data[key] = listMoved
  }
</script>

<div class="flex flex-col gap-3">
  {#each inputLayouts as row}
    <div class={`flex gap-3 w-full`}>
      {#each row as key}
      {@const input = inputs[key]}
      {@const name = !subformed ? key : undefined}
        <div class={`flex-${input?.colspan ? input.colspan : '1'} flex flex-col gap-2`}>
        {#if Object.keys(inputs).includes(key)}
          {#if ["subform"].includes(input.type)}
            <label for={name} class="font-bold">{input.label}</label>
          {:else}
            <label for={name} class="">{input.label} {@html input.required ? '<span class="text-red-500">*</span>' : ""}</label>
          {/if}
          {#if ['image', 'image-text'].includes(input.type)}
          {#if input.type == "image-text"}
            <input
              type="text"
              name={name}
              class="input px-2 py-2 mb-2"
              disabled={input.disabled ?? false}
              readonly={!editable || (input.readonly ?? false)}
              required={input.required ?? false}
              bind:value={data[key]}
              autocomplete={input.autocomplete ?? "off"}
              on:click={input.onClick}
              on:change={input.onChange}
            >
            {/if}
            <Image class={`w-100 rounded-xl overflow-hidden bg-cover bg-center ${input.class}`} src={data[key]} />
          {:else if input.type == "header"}
            <div class="text-3xl mt-5 font-bold ">{input.label ?? ""}</div>
          {:else if ["lists", "subforms"].includes(input.type)}
            <div class={`flex flex-col ${input.type == "lists" ? "gap-2" : "gap-4"} overflow-auto ${input.class ?? ""}`}>
              {#if data[key].length}
              {#each data[key] as val, index}
                <div class="flex gap-3">
                  <div class="flex flex-center p-2 bg-gray-500 w-10 rounded-md text-white">{index + 1}.</div>
                  {#if editable && input.canMove}
                    <div class={`flex ${input.type == "subforms" ? "flex-col" : "flex"} gap-2`}>
                      {#each [
                        {icon: `<i class="fa-solid fa-caret-up"></i>`, cmd: "up"},
                        {icon: `<i class="fa-solid fa-caret-down"></i>`, cmd: "down"}
                      ] as config, configIndex}
                        <button class={`btn-icon flex-1 bg-surface-200 rounded-lg`} disabled={(configIndex == 0 && index == 0) || (configIndex == 1 && index == data[key].length - 1)} type="button" on:click={(e) => onMoveList(e, key, index, config.cmd)}>{@html config.icon}</button>
                      {/each}
                    </div>
                  {/if}
                  <div class="flex-1">
                    {#if input.type == "lists"}
                      <input
                        type="text"
                        class="input px-2 py-2 rounded-md"
                        disabled={input.disabled ?? false}
                        readonly={!editable || (input.readonly ?? false)}
                        required={input.required ?? false}
                        bind:value={data[key][index]}
                        autocomplete={input.autocomplete}
                        on:click={input.onClick}
                        on:change={input.onChange}
                      />
                    {:else if input.type == "subforms"}
                      <svelte:self
                        inputs={input.subform.inputs}
                        inputLayouts={input.subform.inputLayouts}
                        editable={editable}
                        bind:data={data[key][index]}
                        subformed={true}
                      />
                    {/if}
                  </div>
                  {#if editable}
                  <button class="btn-icon text-white bg-error-500 rounded-md" type="button" on:click={(e) => onRemoveLists(e, key, index)}><i class="fa-solid fa-trash"></i></button>
                  {/if}
                </div>
              {/each}
              {:else}
                <div class="text-center text-gray-400 text-sm py-2">ไม่มีรายการ</div>
              {/if}
              {#if editable}
                <button class="btn w-full flex justify-center items-center text-white bg-success-600 p-3 rounded-md" type="button" on:click={(e) => onAddLists(e, key)}><i class="fa-solid fa-plus"></i></button>
              {/if}
              <input name={name} type="hidden" value={JSON.stringify(data[key])} />
            </div>
          {:else if ['select'].includes(input.type)}
            <select
              class="select"
              name={name}
              bind:value={data[key]}
              required={input.required ?? false}
              disabled={!editable || (input.disabled ?? false)}
            >
            {#each input.data as d}
              {#if typeof d == "string"}
                <option value={d}>{d}</option>
              {:else}
                <option value={d.value}>{d.name}</option>
              {/if}
            {/each}
            </select>
          {:else if input.type == "date"}
            <input
            type="date"
            name={name}
            class="input px-2 py-2"
            disabled={input.disabled ?? false}
            readonly={!editable || (input.readonly ?? false)}
            required={input.required ?? false}
            bind:value={data[key]}
            autocomplete={input.autocomplete ?? "off"}
            on:click={input.onClick}
            on:change={input.onChange}
          />
          {:else if input.type == "text"}
            <input
            type="text"
            name={name}
            class="input px-2 py-2"
            disabled={input.disabled ?? false}
            readonly={!editable || (input.readonly ?? false)}
            required={input.required ?? false}
            bind:value={data[key]}
            autocomplete={input.autocomplete ?? "off"}
            on:click={input.onClick}
            on:change={input.onChange}
          />
          {:else if input.type == "number"}
            <input
            type="number"
            name={name}
            class="input px-2 py-2"
            disabled={input.disabled ?? false}
            readonly={!editable || (input.readonly ?? false)}
            required={input.required ?? false}
            bind:value={data[key]}
            autocomplete={input.autocomplete ?? "off"}
            step={input.step ?? 1}
            on:click={input.onClick}
            on:change={input.onChange}
          />
          {:else if input.type == "textarea"}
          <textarea
            type="textarea"
            name={name}
            class="textarea px-2 py-2 flex-auto"
            disabled={input.disabled ?? false}
            readonly={!editable || (input.readonly ?? false)}
            required={input.required ?? false}
            rows={input.rows ?? 3}
            bind:value={data[key]}
            autocomplete={input.autocomplete ?? "off"}
            on:click={input.onClick}
            on:change={input.onChange}
          />
          {:else if input.type == "checkbox"}
            <div class={`flex gap-2 ${(input.flip ?? false) ? "" : "flex-col"}`}>
              {#each input.data as d}
              <label class="flex items-center gap-2">
                {#if typeof d == "string"}
                <input 
                  class="checkbox" 
                  type="checkbox" 
                  
                  bind:group={data[key]} 
                  value={d}
                  on:click={input.onClick}
                  on:change={input.onChange}
                  checked={input.value.includes(d)}
                  disabled={!editable || (input.disabled ?? false)}
                >
                <div>{d}</div>
                {:else}
                <input 
                  class="checkbox" 
                  type="checkbox"  
                  
                  bind:group={data[key]} 
                  value={d.value}
                  on:click={input.onClick}
                  on:change={input.onChange}
                  checked={input.value?.includes(d.value)}
                  disabled={!editable || (input.disabled ?? false)}
                >
                <div>{d.name}</div>
                {/if}
              </label>
              {/each}
              <input name={name} type="hidden" value={JSON.stringify(data[key])} />
            </div>
          {:else if input.type == "toggle"}
              <SlideToggle 
                name=""
                bind:checked={data[key]} 
                disabled={!editable || (input.disabled ?? false)}
                required={input.required ?? false}
                active="bg-success-500"
              >
                {data[key] ? input.toggleOnText ?? "" : input.toggleOffText ?? ""}
              </SlideToggle>
              <input type="hidden" name={name} value={data[key]}>
          {:else if input.type == "link"}
              <div class="flex gap-1">
              <input
                type="text"
                name={name}
                class="input px-2 py-2 rounded-md"
                disabled={input.disabled ?? false}
                readonly={!editable || (input.readonly ?? false)}
                required={input.required ?? false}
                bind:value={data[key]}
                autocomplete={input.autocomplete ?? "off"}
                on:click={input.onClick}
                on:change={input.onChange}
              />
              <a href={data[key]} target="_blank" class="btn-icon bg-primary-500 aspect-square rounded-md"><i class="fa-solid fa-eye"></i></a>
            </div>
          {:else if input.type == "subform"}
            <svelte:self
              inputs={input.subform.inputs}
              inputLayouts={input.subform.inputLayouts}
              editable={editable}
              bind:data={data[key]}
              subformed={true}
            />
            <input type="hidden" name={name} value={JSON.stringify(data[key])}>
          {/if}
        {/if}
        </div>
      {/each}
    </div>
  {/each}
  {#if hiddenKeys.length}
    <div>
    {#each hiddenKeys as key}
      <input type="hidden" name={key} value={hiddenInput[key].value}>
    {/each}
    </div>
  {/if}
</div>