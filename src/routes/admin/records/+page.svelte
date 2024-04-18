<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { recordTypes } from "$lib/utils/records.js";
	import List from "@components/form/List.svelte";

  export let data

  $: path = $page.url.pathname

  const rows = data.records.map((record) => {
    record["shownView"] = record.shown ? 
      `<div class="px-4 py-2 bg-success-500 text-white rounded-full w-fit">เผยแพร่</div>` : 
      `<div class="px-4 py-2 bg-surface-500 text-white rounded-full w-fit">ซ่อน</div>`
    record["typesView"] = record.types.map(type => recordTypes.find(t => t.name == type)?.nameTH ?? type)
    record["langView"] = `${record.languages.join("<br />")}`
    record["softwareView"] = `${record.softwares.join("<br />")}`
    return record
  }).sort((a, b) => a.no_ - b.no_)

  /** @type {import("@components/form/List.svelte").ListColumns}*/
  const columns = {
    no_: {
      name: "รหัส",
      align: "center"
    },
    posterURL: {
      name: "โปสเตอร์",
      type: "image"
    },
    name: "ชื่อโปรเจค",
    typesView: "ประเภท",
    langView: "ภาษา/เครื่องมือ",
    softwareView: "โปรแกรม",
    recommended: "แนะนำ",
    shownView: "แสดง",
    action: {
      name: "คำสั่ง",
      type: "button",
      button: {
        see: {
          icon: `<i class="fa-solid fa-eye"></i>`,
          class: "bg-white",
          type: "button",
          onClick: (data) => {
            goto(`${path}/${data.no_}`)
          }
        },
        // delete: {
        //   icon: `<i class="fa-solid fa-trash"></i>`,
        //   class: "!bg-error-400"
        // },
      }
    }
  }

  /**
   * @param {object} data
   */
  function onSelect(data) {
    goto(`${path}/${data.no_}`)
  }

</script>

<div class="p-4 flex flex-col overflow-hidden h-full">
  <div class="flex justify-between">
    <div class="text-4xl mb-3">ผลงาน</div>
    <div class="flex gap-2">
      <div>
        <a href="/admin/records/settings" class="btn bg-surface-400">ตั้งค่า</a>
      </div>
      <div>
        <a href="/admin/records/create" class="btn bg-primary-500">เพิ่ม</a>
      </div>
    </div>
  </div>
  <div class="flex-auto overflow-hidden">
    <List {rows} {columns} {onSelect} classes="h-full" />
  </div>
</div>