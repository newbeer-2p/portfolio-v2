<script>
	import { getRecordType } from '$lib/utils';
	import { title } from '$lib/utils/store.js';
	import Image from '@components/Image.svelte';
	import { onMount } from 'svelte';

  export let data

  const record = data.record

  /** @type {Element} */
  let page
  onMount(() => {
    page.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  })

  $: title.set(record.name)
</script>

<div bind:this={page}>
  <div class="h-[500px] bg-cover bg-fixed" style={`background-image: url(${record.posterURL})`}></div>
  <div class="container m-auto flex flex-col gap-5 py-6 p-4">
    <div class="flex gap-5 *:flex-1">
      <div class="flex gap-3">
        {#each record.types as key}
        {@const type = getRecordType(key)}
          <div class={`px-4 py-1 rounded-full ${type.class ?? ""}`}>{type.nameTH}</div>
        {/each}
      </div>
      <div class="flex justify-end gap-3">
        {#each [
          { label: "มหาลัย", show: record.project, color: "from-indigo-300 to-indigo-500"},
          { label: "แนะนำ", show: record.recommended, color: "from-warning-300 to-warning-500"},
        ] as config}
        {#if config.show}
          <div class={`px-4 py-1 rounded-full bg-gradient-to-r ${config.color}`}>{config.label}</div>
        {/if}
        {/each}
      </div>
    </div>
    <div class="flex justify-between">
      <div class="flex flex-col gap-3">
        <div class="text-5xl">{record.name}</div>
        {#if record.githubURL}
        <div class="flex gap-2">
          <a href={record.githubURL} target="_blank"><div class="btn bg-surface-200 rounded-md flex justify-center items-center">
            <i class="fa-brands fa-github"></i>
            <div>GitHub</div>
          </div></a>
        </div>
        {/if}
      </div>
    </div>
    {#if record.project && record.subjects.length}
      <div class="text-center text-surface-400">วิชา: {record.subjects.join(", ")}</div>
    {/if}
    <div class="flex justify-center">
      <img src={record.posterURL} alt="" class="max-h-[500px] rounded-lg">
    </div>
    <div class="text-2xl">{record.description}</div>
    <div class="flex flex-wrap gap-10 md:gap-5">
      {#each [
        {header: "โปรแกรมที่ใช้", data: record.softwares, path: "softwares"},
        {header: "ภาษาและเครื่องมือที่ใช้", data: record.languages, path: "languages"},
      ] as config}
      {#if config.data.length}
      <div class="flex-[1_1_100%] md:flex-1 flex flex-col gap-4">
        <div class="text-3xl font-bold">{config.header}</div>
        <div class="flex flex-wrap gap-4">
          {#each config.data as name}
            <div class="relative p-6 bg-slate-200 rounded-lg min-w-48 min-h-48 text-center drop-shadow-lg shadow-black/25 bg-contain bg-no-repeat bg-origin-content hover:scale-105 transition-all" style={`background-image: url(/${config.path}/${name.replaceAll(" ", "%20")}.png)`}>
              <div class="absolute bottom-0 left-0 text-center w-full py-4 px-2 truncate text-xl bg-gradient-to-b from-transparent from-0% to-50% to-white">{name}</div>
            </div>
          {/each}
        </div>
      </div>
      {/if}
      {/each}
      <div class="flex-[1_1_100%] xl:flex-1">
        <div class="flex flex-col gap-4">
          <div class="text-3xl font-bold">หน้าที่</div>
          {#each record.roles as role}
            <div class="p-4 shadow-md rounded-lg hover:scale-105 transition-all bg-surface-50">{role}</div>
          {/each}
        </div>
      </div>
    </div>
    <div class="flex flex-col flex-center gap-5">
      {#if record.demoURL != ""}
      <div class="text-3xl font-bold">วิดีโอ</div>
      {#if record.demoURL.startsWith("https://youtu.be/")}
      <iframe class="!w-full max-w-[1024px] md:w-auto" width="1024px" height="500px" src={`https://www.youtube.com/embed/${record.demoURL.split("https://youtu.be/")[1]}`} title={record.name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      {:else}
      <video controls={true} class="max-w-[1024px] w-full lg:w-auto">
        <source src={record.demoURL.replaceAll(" ", "%20")} type="video/mp4" />
        <track kind="captions">
      </video>
      {/if}
      {/if}
    </div>
    {#if record.linkURL}
      <div class="text-center">ดูเพิ่มเติม: <a href={record.linkURL} target="_blank" class="text-orange-500 hover:underline">{record.linkURL}</a></div>
    {/if}
  </div>
</div>