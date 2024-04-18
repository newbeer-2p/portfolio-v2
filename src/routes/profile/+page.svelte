<script>
	import { toDateTH } from '$lib/utils';
  import Carousel from '@components/Carousel.svelte';
  import Header from '@components/Header.svelte';

  export let data;
  const user = data.user;
  const address = user.contact.address

  const expCurrentIndex = user.experiences.findIndex(exp => exp.worked)
  const expCurrent = user.experiences[expCurrentIndex]
</script>

<div class="pb-6">
  <div class="pt-5 overflow-x-hidden flex container m-auto w-full">
    <div class="w-full flex flex-col gap-4">
      <div>
        <Header text="ประวัติส่วนตัว" />
        <div class="flex flex-col lg:flex-row gap-5 mt-5">
          <div class="flex-1 overflow-hidden">
            <Carousel imageURLs={user.imageURLs.slice(0, 5)} />
          </div>
          <div class="flex-1 p-5 flex flex-col gap-5">
            <div class="grid grid-cols-2 *:col-span-2 md:*:col-span-1 gap-4">
              {#each [
                { label: "ชื่อ-นามสกุล", text: user.titleTH + user.fullNameTH },
                { label: "ชื่อเล่น", text: user.nicknameTH },
                { label: "วันเกิด", text: toDateTH(user.birthday) },
                { label: "อายุ", text: `${user.age} ปี` },
                { label: "อีเมล", text: user.contact.email, class: "lg:!col-span-2 2xl:!col-span-1" },
                { label: "เบอร์", text: user.contact.phone },
                { label: "ที่อยู่", text: `${address.houseNo} หมู่ ${address.moo} หมู่บ้าน${address.village} ซอย${address.soi} ถนน${address.street} ตำบล${address.subDistrict} อำเภอ${address.district} จังหวัด${address.province} ประเทศ${address.country} ${address.postalCode}`, class: "!col-span-2" },
                { label: "คำอธิบาย", text: user.descriptionTH, class: "!col-span-2" },
              ] as config}
                <div class={config.class ?? ""}>
                  <div class="text-gray-500">{config.label}</div>
                  <div class="text-2xl">{config.text}</div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <Header text="ประสบการณ์" />
        <div class="ps-4 flex flex-col gap-2">
          <div class="flex flex-col gap-2 pt-3">
            {#each [expCurrent ,...user.experiences.filter((exp, index) => index != expCurrentIndex)] as exp, index}
              <div class="p-4 rounded-lg flex flex-col gap-3 md:gap-1">
                <div class="flex gap-3 flex-col md:flex-row">
                  <div class={`text-3xl font-bold ${index == 0 ? "text-success-600" : ""}`}>{exp.company}</div>
                  {#if index == 0}
                    <div><span class="bg-success-500 px-3 py-1 rounded-full animate-pulse">ปัจจุบัน</span></div>
                  {:else}
                    <div class="flex gap-2">
                      <div><span class="bg-surface-300 px-3 py-1 rounded-full">{exp.periodYear ? `${exp.periodYear} ปี ` : ""} {exp.periodMonth} เดือน</span></div>
                    </div>
                  {/if}
                </div>
                <div class="text-xl">
                  <div class={`text-base text-gray-400`}>ปี {exp.yearStart} {exp.worked ? "- ปัจจุบัน" : exp.yearEnd != exp.yearStart ? `- ${exp.yearEnd}` : ""}</div>
                  <div><span class="text-2xl font-bold">{exp.position}</span></div>
                  <div>{exp.description}</div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
      
      <div class="flex flex-col gap-1">
        <Header text="สกิล" />
        <div class="flex flex-col md:flex-row gap-4 p-4 md:p-0 md:ps-4 mt-5">
          {#each [
            {label: "ภาษา/เครื่องมือ", path: "languages", data: user.skill.languages},
            {label: "โปรแกรม", path: "softwares", data: user.skill.softwares},
          ] as config}
            <div class="flex flex-col gap-2">
              <div class="text-xl font-bold">{config.label}</div>
              <div class="flex flex-col gap-4">
                {#each config.data as d}
                <div class="flex flex-col items-center sm:flex-row md:flex-col lg:flex-row gap-2 bg-gray-200 p-4 rounded-xl">
                  <div class="w-32 aspect-square bg-contain bg-no-repeat bg-center bg-origin-content p-2" style={`background-image: url(/${config.path}/${d.name.replaceAll(" ", "%20")}.png)`}></div>
                  <div class="flex-1 flex flex-col gap-1">
                    <div class="flex gap-2 justify-between">
                      <div class="font-bold text-xl">{d.name}</div>
                      {#if d.level == "excellent"}
                      <div class="bg-success-500 px-4 py-1 rounded-full">ดีเยี่ยม</div>
                      {:else if d.level == "good"}
                      <div class="bg-secondary-400 px-4 py-1 rounded-full">ดี</div>
                      {:else if d.level == "basic"}
                      <div class="bg-tertiary-400 px-4 py-1 rounded-full">พื้นฐาน</div>
                      {:else}
                      <div class="bg-white px-4 py-1 rounded-full">{d.level}</div>
                      {/if}
                    </div>
                    <div>{d.description}</div>
                  </div>
                </div>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
