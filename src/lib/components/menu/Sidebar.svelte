<script>
  import { page } from '$app/stores';

  export let menus = [];
  export let title = '';
  export let canCollaspe = false;

  $: isCollasped = false;
  $: topMenus = menus.filter((menu) => !menu.layout || menu.layout == 'top');
  $: bottomMenus = menus.filter((menu) => menu.layout == 'bottom');
</script>

<div class="flex relative">
  <div class={`sidebar ${isCollasped ? ' !w-fit' : ''}`}>
    <div>{title}</div>
    <div class="flex flex-col justify-between flex-auto pb-2">
      <div class="flex flex-col gap-2">
        {#each topMenus as menu}
          <a href={menu.to}>
            <div class={`menu-item ${$page.url.pathname.startsWith(menu.to) ? 'selected' : ''}`}>
              <span>{@html menu.icon ?? ''} </span>{!isCollasped ? menu.name : ''}
            </div>
          </a>
        {/each}
      </div>
      <div class="flex flex-col">
        {#each bottomMenus as menu}
          <a href={menu.to}>
            <div class={`menu-item ${$page.url.pathname === menu.to ? 'selected' : ''}`}>
              <span>{@html menu.icon ?? ''} </span>{!isCollasped ? menu.name : ''}
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>
  {#if canCollaspe}
  <div class="pb-2 absolute right-[-14px] flex items-center h-full">
    <button
      class="btn-icon !w-7 p-2 text-xs bg-orange-400"
      on:click={() => (isCollasped = !isCollasped)}
    >
    {#if isCollasped}
    <i class="fa-solid fa-angle-right"></i>
    {:else}
    <i class="fa-solid fa-angle-left"></i>
    {/if}
    </button>
  </div>
{/if}
</div>

<style>
  .sidebar {
    @apply w-48 px-2 flex flex-col gap-2 bg-orange-300;
    transition: all 0.2;
  }

  .menu-item {
    @apply p-2 rounded-md;
  }

  .menu-item:hover {
    @apply bg-orange-400;
  }

  .menu-item.selected {
    @apply bg-orange-500;
  }
</style>
