<script>
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';

    export let form;

    $: if (form && browser) goto($page.url.pathname)
    const toastStore = getToastStore()

    function onLogin({ formElement }) {
        console.log("formElement", formElement);

        return async function({ update, result }) {
            await update()
            toastStore.trigger({
                message: result.data.message,
                classes: `rounded-lg ${result.data.success ? "bg-green-500" : "bg-red-500"}`
            })
            if (result.data.success) {
                setTimeout(() => {
                    goto("/admin/dashboard")
                }, 1000)
            }
        }
    }
</script>

<div class="full-screen flex flex-center absolute top-0 left-0 bg-white">
    <div class="flex flex-col gap-5">
        <div class="text-5xl font-bold text-center">Admin console</div>
        <form action="?/login" method="post" use:enhance={onLogin}>
            <div class="flex flex-col gap-2">
                <div>
                    <label for="">Username:</label>
                    <input type="text" name="username" class="input rounded-lg p-1">
                </div>
                <div>
                    <label for="">Password:</label>
                    <input type="password" name="password" class="input rounded-lg p-1">
                </div>
                <div class="text-right"><button type="submit" class="btn bg-orange-500 rounded-full">Login</button></div>
            </div>
        </form>
    </div>
</div>

<Toast />