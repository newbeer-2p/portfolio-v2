<script>
	import { getModalStore } from '@skeletonlabs/skeleton';
	import CardModal from './CardModal.svelte';

  export let data

  const { languages, softwares } = data

  const modalStore = getModalStore()

  /**
   * @param {string} path
   * @param {string} name
   */
  function onModal(path, name) {
    modalStore.trigger({
      type: "component",
      component: {
        ref: CardModal,
        props: {
          name,
          path
        }
      }
    })
  }

</script>

<div class="flex flex-col gap-4 p-6">
  {#each [
    {text: "โปรแกรมที่ใช้", data: softwares, path: "softwares"},
    {text: "ภาษาหรือเครื่องมือที่ใช้", data: languages, path: "languages"},
  ] as config}
  <div>
    <div class="text-3xl">{config.text}</div>
    <div class="flex gap-2 gap-y-4 flex-wrap">
      {#each config.data as name}
        <div class="text-center flex flex-col gap-2">
          <div class="overflow-hidden rounded-md bg-surface-100 bg-center bg-no-repeat bg-contain bg-origin-content p-3 relative size-36 *:size-36 *:hidden *:hover:!flex" style={`background-image: url(/${config.path}/${name.replaceAll(" ", "%20")}.png)`}>
            <div class="absolute top-0 left-0 bg-black/50 flex flex-center h-full">
              <button class="btn-icon bg-white" on:click={() => onModal(config.path, name)}><i class="fa-solid fa-pencil"></i></button>
            </div>
          </div>
          <div class="p-2 bg-primary-500 rounded-md">{name}</div>
        </div>
      {/each}
    </div>
  </div>
  {/each}
</div>


<!-- <CardModal /> -->