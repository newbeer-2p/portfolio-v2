<script>
  export let src

  const attr = $$restProps

  let isFullImage = false

  function onOpen() {
    isFullImage = true
  }

  function onClose() {
    isFullImage = false
  }
</script>

<div {...attr} class={`hover:[&>div]:opacity-100 ${attr.class ?? ""}`} style={`background-image: url(${src}); ${attr.style ?? ""}`}>
  <div class="w-full h-full transition-all opacity-0 flex justify-end items-end p-2 bg-gradient-to-b from-transparent from-50% to-black/80">
    <button type="button" class="btn-icon flex flex-center bg-white" on:click={onOpen}><i class="fa-solid fa-eye"></i></button>
  </div>
</div>

{#if isFullImage}
  <button type="button" class="fixed full-screen top-0 left-0 z-[998] bg-black/80 p-6 cursor-default">
    <button type="button" class="absolute right-2 top-2 btn-icon text-white text-xl bg-red-500" on:click|stopPropagation={onClose}>
      <!-- <i class="fa-solid fa-circle-xmark"></i> -->
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="w-full h-full bg-no-repeat bg-center bg-contain" style={`background-image: url(${src})`}></div>
  </button>
{/if}

