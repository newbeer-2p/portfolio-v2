<script>
	import { enhance } from "$app/forms";
	import { FileButton, getToastStore } from "@skeletonlabs/skeleton";

  export let parent
  export let path, name

  const cBase = 'card p-4 w-modal shadow-xl space-y-4'
  const cHeader = 'text-2xl font-bold'
  
  const toastStore = getToastStore()

  /** @type {FileList} */
  let files

  async function onFiles() {
    const reader = new FileReader();
    const file = files[0]
    if (file.type.startsWith("image/")) {
      reader.onloadend = () => {
        dataURL = reader.result.toString()
        imgSrc = dataURL
      };
      reader.readAsDataURL(file);
    } else {
      toastStore.trigger({
        message: "กรุณาเลือกไฟล์รูปภาพ",
        classes: "bg-error-500"
      })
    }
  }

  let imgSrc = `/${path}/${name}.png`
  let dataURL = ""
  let link = ""

  $: if (link != "") imgSrc = link

  let type

</script>

<div class="fixed full-screen bg-black/40 top-0 left-0 flex flex-center">
  <div class="flex flex-col {cBase}">
    <form class="flex flex-col gap-2" method="post" action="?/save">
      <header class={cHeader}>{name}</header>
      <div class="flex flex-col gap-6">
        <div class="flex flex-center w-full flex-col gap-3">
          <img class="size-48" src={imgSrc} alt={name}>
        </div>
        <div class="flex gap-2">
          <div>
            <select name="type" bind:value={type} class="select">
              <option value="upload">อัปโหลด</option>
              <option value="link" selected>ลิงก์</option>
            </select>           
            <input type="hidden" name="name" value={name}>
            <input type="hidden" name="path" value={path}>
          </div>
          {#if type == "upload"}
          <div class="flex-1">
            <FileButton name="" bind:files={files} on:change={onFiles} />
            <input type="hidden" name="dataURL" value={imgSrc}>
            <input type="hidden" name="fileType" value={files?.[0].type}>
          </div>
          {:else if type == "link"}
          <div class="flex-1 input-group input-group-divider grid-cols-[auto_1fr_auto]">
            <div class="input-group-shim">Link</div>
            <input type="text" name="link" class="p-2" bind:value={link} autocomplete="off" />
          </div>
          {/if}
        </div>
      </div>
      <footer class="{parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" type="button" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn bg-primary-600 {parent.buttonPositive}" type="submit" on:click={parent.onClose}>{parent.buttonTextConfirm}</button>
      </footer>
    </form>
  </div>
</div>
