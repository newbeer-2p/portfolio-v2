<script>
  /** @type {string} */
  export let href=undefined
  export let coverURL=""
  export let header=""
  export let headerClasses=""
  export let content=""
  export let contentClasses=""
  export let footer=""
  export let footerClasses=""
  export let classes=""
</script>

<div class={`card overflow-hidden rounded-md ${classes}`}>
  <a href={href ?? ""} class={`flex flex-col h-full ${href == undefined ? "cursor-default" : ""}`}>
    <header class={`card-header bg-cover bg-center ${headerClasses}`} style={`background-image: url(${coverURL})`}>{@html header}</header>
    <section class={`p-4 ${contentClasses}`}>{@html content}</section>
    <footer class={`card-footer ${footerClasses}`}>{@html footer}</footer>
  </a>
</div>
				