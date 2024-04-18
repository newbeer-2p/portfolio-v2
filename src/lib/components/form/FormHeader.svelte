<script context="module">
  /**
   * @typedef {object} FormHeader
   * @property {string} [name]
   * @property {string} [description]
  */
</script>

<script>
  /** @type {FormHeader} */
  export let header = {}
</script>

{#if Object.keys(header).length}
<div class="flex flex-col gap-5">
  <div class="text-4xl">{header.name ?? ""}</div>
  <div class="text-gray-500">{header.description ?? ""}</div>
</div>
{/if}