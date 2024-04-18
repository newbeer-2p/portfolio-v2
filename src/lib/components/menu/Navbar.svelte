<script>
  import { page } from '$app/stores';

  export let menus = [];
  export let logo = '';
  export let logoText = '';

  $: path = $page.url.pathname

  let toggledMenu = false

</script>

<div class="navbar shadow-md h-12">
  <div class="container flex justify-between w-full">
    <div class="flex gap-2">
      <a href="/" class="flex">
        <div class="flex gap-2 items-center">
          <div>{@html logo}</div>
          <div>{logoText}</div>
        </div>
      </a>
    </div>
    <div class="md:flex hidden gap-2">
      {#each menus as menu}
        <a href={menu.to}>
          <div class={`menu-item ${(path == "/" && menu.to == "/") || (menu.to != "/" && path.startsWith(menu.to)) ? 'selected' : ''}`}>
            {menu.name}
          </div>
        </a>
      {/each}
    </div>
    <div class="md:hidden">
      <button class="btn-icon" on:click={() => toggledMenu = !toggledMenu}><i class="fa-solid fa-bars"></i></button>
    </div>
  </div>
</div>
<div class={`mt-12 md:hidden overflow-hidden p-4 bg-white size-full fixed top-0 z-10 transition-all duration-1000 ${toggledMenu ? "left-0" : "left-full"}`}>
  {#each menus as menu}
    <a href={menu.to} on:click={() => toggledMenu = false}>
      <div class={`menu-item-mobile ${(path == "/" && menu.to == "/") || (menu.to != "/" && path.startsWith(menu.to)) ? 'selected' : ''}`}>
        {menu.name}
      </div>
    </a>
  {/each}
</div>

<style>
  .navbar {
    @apply px-4 flex flex-col gap-2 items-center justify-center bg-gradient-to-l from-orange-300 to-orange-400 z-10;
  }

  .menu-item {
    @apply px-2 py-1;
  }

  .menu-item:hover {
    @apply border-b-2 border-orange-400;
  }

  .menu-item.selected {
    @apply border-b-2 border-orange-500;
  }

  .menu-item-mobile {
    @apply p-4;
  }

  .menu-item-mobile.selected {
    @apply bg-orange-400 rounded-md;
  }
</style>
