<script>
// @ts-nocheck

	import { toRecordCard } from '$lib/utils';
	import Card from '@components/Card.svelte';
	import Gallary from '@components/Gallary.svelte';
	import { fade } from 'svelte/transition';

  export let data;
  let user = data.user;
  let records = data.records;

  function onScroll(event) {
    const target = event.currentTarget.dataset.to
    const element = document.querySelector(target)
    if (element)
      element.scrollIntoView({
        behavior: 'smooth'
      })
  }

  /** @type {import('$lib/server/models/record.js').RecordType} */
  let recordSelected = "website"
  let recordShows = []
  setRecordSelected(recordSelected)

  /**
   * @param {import('$lib/server/models/record.js').RecordType} name
   */
  function setRecordSelected(name) {
    recordSelected = name
    recordShows = records.filter(rec => rec.types.includes(name)).map(rec => toRecordCard(rec))
  }

  let moralShown = false

</script>

<div class="pb-6">
  <div class="banner flex h-screen md:h-[36rem] p-4 md:p-0 flex-col md:flex-row gap-10 md:gap-0 justify-center md:*:flex-1">
    <div class="flex items-center md:items-start text-center md:text-start order-last md:order-none">
      <div class="flex flex-col gap-3 w-full md:w-[50%] md:m-auto">
        <div class="text-3xl text-orange-500 font-bold">แฟ้มสะสมผลงาน</div>
        <div class="text-5xl lg:text-6xl">{user.firstNameTH}</div>
        <div class="text-5xl lg:text-6xl">{user.lastNameTH}</div>
        <div class="text-xl text-gray-500">{user.fullName}</div>
        <div>
          <button class="btn gradient-orange shadow-lg" on:click={onScroll} data-to="#about-me">About Me</button>
        </div>
        <div id="social-media" class="flex gap-2 justify-center md:justify-start">
          {#each Object.keys(user.social) as key}
            {@const url = user.social[key]}
            {#if ["github", "linkedin"].includes(key)}
              <div><a href={url} target="_blank" class="btn-icon text-gradient-orange !bg-gradient-to-br text-xl"><i class={`fa-brands fa-${key}`}></i></a></div>
            {/if}
          {/each}
        </div>
      </div>
    </div>
    <div class="flex flex-center">
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="flex flex-col gap-5 items-center" on:mouseenter={(e) => moralShown = true} on:mouseleave={(e) => moralShown = false}>
        <img src={user.imageURLs[user.profileImageNo]} alt="" class="w-80 aspect-square rounded-full">
        {#if moralShown}
          <div transition:fade class="text-center text-xl text-clip text-gray-500">"{user.moralTH}"</div>
        {/if}
      </div>
    </div>
  </div>

  <div>
    <div class="container p-4 lg:p-0 md:m-auto" id="about-me">
      <div class="flex flex-col lg:flex-row gap-5 py-10 *:flex-1">
        <div class="flex flex-center overflow-hidden h-[500px] aspect-square !rounded-lg bg-cover bg-center" style={`background-image: url(${user.imageURLs[5]})`}></div>
        <div class="px-5 py-4 flex flex-col">
          <div class="flex flex-col gap-6">
            <div class="*:text-5xl *:font-bold relative">
              <div class="ps-1 pt-1 text-black/85">ABOUT ME</div>
              <div class="text-gradient-orange absolute top-0 left-0">ABOUT ME</div>
            </div>
            <div class="text-2xl">
              {@html "&emsp;&emsp;" + user.descriptionTH}
            </div>
          </div>
          <div class="text-center flex flex-col gap-3">
            <div class="text-3xl text-gray-500">I'm</div>
            <div class="text-4xl md:text-6xl flex justify-center gap-5 *:transition-all hover:*:scale-125">
              <button class="hover:text-blue-400" on:click={(e) => {
                setRecordSelected("website")
                onScroll(e)
              }} data-to="#records">WEB</button> / <button class="hover:text-green-500" on:click={(e) => {
                setRecordSelected("game")
                onScroll(e)
              }} data-to="#records">GAME</button>
            </div>
            <div class="h-1 bg-black/25"></div>
            <div class="text-5xl md:text-8xl font-bold">DEVELOPER</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div>
    <div class="container p-4 xl:p-0 xl:m-auto flex flex-col gap-4" id="records">
      <div class="text-7xl text-center">ผลงาน</div>
      <div class="*:flex-1 flex gap-3">
        {#each [
          {name: "website", color: "gradient-blue", label: "WEBSITE"},
          {name: "game", color: "gradient-green", label: "GAME"},
        ] as config}
          <button class={`btn rounded-md text-white text-xl font-bold ${recordSelected == config.name ? config.color : "!text-gray-600 border-2 border-gray-500/50 bg-white"}`} on:click={() => setRecordSelected(config.name)}>{config.label}</button>
        {/each}
      </div>
      <div class="*:grid md:*:grid-cols-2 xl:*:grid-cols-3">
        <Gallary ref={Card} props={recordShows} />
      </div>
      <div class="flex justify-end">
        <a class="btn bg-warning-500 flex gap-2" href="/records">ดูเพิ่มเติม <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </div>
  </div>
</div>
<style>
  .banner {
    background: linear-gradient(120deg, rgb(248, 212, 145) 0%, white 15% 80%, rgb(255, 209, 123) 100%);
  }
</style>
