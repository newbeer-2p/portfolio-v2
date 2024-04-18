<script>
	import { fade, fly } from "svelte/transition";

  export let imageURLs = []

  let carouselIndex = 0
  let isNext = true
  
  function prev() {
    carouselIndex = carouselIndex - 1 < 0 ? imageURLs.length - 1 : carouselIndex - 1
    isNext = false
  }
  
  
  function next() {
    carouselIndex = carouselIndex + 1 == imageURLs.length ? 0 : carouselIndex + 1
    isNext = true
  }

  function selectImg(index) {
    carouselIndex = index
  }
</script>

<div class="flex flex-col h-full gap-5 overflow-hidden p-4 lg:p-0">
  <div class="p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center flex-auto">
    <button type="button" class="btn-icon variant-filled" on:click={prev}>
      <i class="fa-solid fa-arrow-left" />
    </button>
    <div class="flex justify-center overflow-hidden w-full h-[50vw] lg:h-[20vw]">
      {#key carouselIndex}
        <div class="rounded-lg aspect-square size-full bg-contain bg-no-repeat bg-center" in:fly|global={{x: 200 * (isNext ? 1 : -1), duration: 600}} out:fade|global={{duration: 0}} style={`background-image: url(${imageURLs[carouselIndex]})`}></div>
      {/key}
    </div>
    <button type="button" class="btn-icon variant-filled" on:click={next}>
      <i class="fa-solid fa-arrow-right" />
    </button>
  </div>
  
  <div class="flex py-5 overflow-x-auto gap-5 justify-center flex-nowrap p-4">
    {#each imageURLs as url, index}
    <div class="flex-none">
      <button on:click={() => selectImg(index)}>
        <div class={`w-[20vw] lg:w-[5vw] aspect-square rounded-container-token ${index == carouselIndex ? " shadow-[0_0_8px_2px] shadow-orange-500/50" : ""}`} style={`background-image: url(${url}); background-size: cover; background-position: center;`}></div>
      </button>
    </div>
    {/each}
  </div>
</div>
