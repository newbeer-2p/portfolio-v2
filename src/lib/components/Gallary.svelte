<script>
  /** @type {ConstructorOfATypedSvelteComponent} */
  export let ref
  /** @type {Record<string, any>[]} */
  export let props
  export let classes=""
</script>

<div class={`flex gap-5 flex-wrap ${classes}`}>
  {#each props as prop}
    <svelte:component this={ref} {...prop} />
  {/each}
</div>