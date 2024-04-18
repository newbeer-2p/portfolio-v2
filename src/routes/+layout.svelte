<script>
	import '../app.pcss';
	import { navigating, page } from '$app/stores'
	import Navbar from '@components/menu/Navbar.svelte';
	import Sidebar from '@components/menu/Sidebar.svelte';
	import { adminMenus, defaultMenus } from '$lib/utils/menus';
	import { Modal, ProgressRadial, Toast, initializeStores } from '@skeletonlabs/skeleton';
	import { title } from '$lib/utils/store';

	let menus = []
	initializeStores()

	$: path = $page.url.pathname
	$: isAdmin = path?.startsWith("/admin")


	$: if (isAdmin) {
		menus = adminMenus
	} else {
		menus = defaultMenus.filter((menu) => !menu.to.startsWith("/admin"))
	}

	$: if (path == "/") {
		title.set("หน้าแรก")
	} else {
		const menu = menus.find(menu => path === menu.to)
		if (menu) {
			title.set(menu.name, isAdmin ? "Admin" : undefined)
		} else {
			title.clear()
		}
	}

</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<div class="flex flex-col h-[100vh]">
	<Navbar menus={isAdmin ? [] : menus} logoText="Newbeer portfolio" />
	<div class="flex flex-1 overflow-hidden">
		{#if isAdmin}
			<Sidebar menus={menus} canCollaspe={true} />
		{/if}
		<div class="flex-1 overflow-hidden *:h-full *:overflow-auto bg-white">
			<slot />
		</div>
	</div>
</div>

{#if $navigating}
<div class="flex justify-center items-center fixed top-0 left-0 w-[100vw] h-[100vh]">
	<ProgressRadial />
</div>
{/if}

<Modal zIndex=997 />
<Toast zIndex=999 />

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>