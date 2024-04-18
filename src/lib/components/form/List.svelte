<script context="module">
  /**
   * @typedef {Record<string, ListColumn|string>} ListColumns
  */

  /**
   * @typedef {object} ListButton
   * @property {string} [text]
   * @property {string} [icon]
   * @property {'submit'|'button'|'reset'} [type='submit']
   * @property {string} [action]
   * @property {string} [class]
   * @property {(data: object) => void} [onClick]
  */

  /**
   * @typedef {object} ListColumn
   * @property {string} name
   * @property {'text'|'button'|'image'} [type='text']
   * @property {Record<string, ListButton>} [button] for image type
   * @property {string} [class]
   * @property {'start'|'center'|'end'} [align='start']
  */

  /**
   * @typedef {object} ListRowsCustom
   * @property {string} [$class]
   * 
   * @typedef {(object & ListRowsCustom)[]} ListRows
  */
</script>

<script>
	import { enhance } from "$app/forms";

  /** @type {ListRows} */
  export let rows
  /** @type {ListColumns} */
  export let columns
  /** @type {(data: object) => void} */
  export let onSelect = () => {}
  export let classes = ""

  const colKeys = Object.keys(columns)
</script>

<div class={`table-container ${classes}`}>
  <table class="table table-hover relative overflow-auto">
    <thead>
        <tr>
          {#each colKeys as key}
            {@const value = columns[key]}
            {@const col = columns[key]}
            <th class={`sticky top-0 bg-surface-200 ${typeof col == "object" ? `text-${col.align ?? "start"}` : "text-start"}`}>
              {#if typeof value == "object"}
                {value.name}
              {:else}
                {value}
              {/if}
            </th>
          {/each}
        </tr>
    </thead>
    <tbody>
      {#each rows as row}
      <tr class={`${row["$class"] ?? ""}`} on:click={() => onSelect(row)}>
        {#each colKeys as key}
        {@const value = row[key]}
        {@const col = columns[key]}
          <td class={` ${typeof col == "object" ? `text-${col.align ?? "start"}` : "text-start"}`}>
            {#if typeof col == "object" && col.type == "image"}
              <img src={value} alt="" class="aspect-square rounded-md h-16 object-cover">
            {:else if typeof col == "object" && col.type == "button"}
              <form method="post" class="flex gap-2" use:enhance>
                {#each Object.keys(col.button) as btnKey}
                {@const btn = col.button[btnKey]}
                  <button type={btn.type ?? "submit"} class={`${btn.icon ? "btn-icon" : "btn"} bg-primary-500 ${btn.class}`} formaction={btn.action ?? `?/${btnKey}`} on:click={() => btn?.onClick(row)}>
                    {#if btn.icon}
                      {@html btn.icon}
                    {:else}
                      {@html btn.text}
                    {/if}
                  </button>
                {/each}
              </form>
            {:else}
              {#if Array.isArray(value)}
                {#if value.length}
                  {@html value.join(", ")}
                {:else}
                  -
                {/if}
              {:else if typeof value == "string" && value == ""}
                -
              {:else if typeof value == "boolean"}
                {#if value}
                  <i class="fa-solid fa-circle-check text-success-500 text-xl"></i>
                {:else}
                  <i class="fa-solid fa-circle-xmark text-error-500 text-xl"></i>
                {/if}
              {:else}
                {@html value}
              {/if}
            {/if}
          </td>
        {/each}
      </tr>
      {/each}
    </tbody>
  </table>
  {#if rows.length == 0}
    <div class="text-center py-6">ไม่มีรายการ</div>
  {/if}
</div>