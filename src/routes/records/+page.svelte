<script>
	import { randomArray, recordTypes, toRecordCard } from '$lib/utils';
  import Card from '@components/Card.svelte';
	import Gallary from '@components/Gallary.svelte';

  export let data
  const records = data.records
  const recordGroups = data.recordGroups
</script>

<div>
  <div class="relative h-64 flex flex-center p-0">
    <div class="absolute top-0 left-0 w-full h-full blur-sm opacity-75 bg-cover bg-center" style={`background-image: url(${records[0].posterURL})`}></div>
    <div class="*:text-7xl relative">
      <div class="ps-1 pt-1 text-black/85">ผลงาน</div>
      <div class="text-gradient-orange absolute top-0 left-0">ผลงาน</div>
    </div>
  </div>
  <div class="container m-auto p-4 xl:p-0 flex flex-col gap-5 py-4">
    {#each Object.keys(recordGroups) as group}
    {@const records = recordGroups[group].map(rec => toRecordCard(rec))}
    <div>
      <div class="text-3xl font-bold mb-4">{recordTypes.find(type => type.name == group)?.nameTH}</div>
      {#if records.length}
        <div class="*:grid *:grid-cols-1 md:*:grid-cols-2 xl:*:grid-cols-3">
          <Gallary ref={Card} props={records} />
        </div>
      {:else}
        <div class="py-16 text-center text-2xl">ไม่มีผลงาน</div>
      {/if}
    </div>
    {/each}
  </div>
</div>