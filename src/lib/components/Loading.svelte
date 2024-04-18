<script>
	import { ProgressRadial } from "@skeletonlabs/skeleton";

  export let text = ""
  export let loading = false
</script>

{#if loading}
  <div class="fixed top-0 left-0 w-[100vw] h-[100vh] z-[1000] bg-gray-600/80 flex justify-center items-center">
    <div class="bg-white min-w-[20rem] min-h-[20rem] p-5 rounded-md flex flex-col justify-center gap-5 text-center">
      <div class="flex justify-center">
        <ProgressRadial stroke={50} strokeLinecap="round" width="w-48" />
      </div>
      <div class="text-2xl text-clip">{text == "" ? "กำลังโหลด..." : text }</div>
    </div>
  </div>
{/if}