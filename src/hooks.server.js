import { redirect } from "@sveltejs/kit"

export const handle = async ({ event, resolve }) => {
    const unProtectedAdminRoutes = ['/admin', '/admin/login']
    const sessionId = event.cookies.get("session_id")
    const pathname = event.url.pathname

    if (pathname.startsWith('/admin')) {
        if (!sessionId && (!unProtectedAdminRoutes.includes(pathname) || pathname.split("/").length == 2)) {
            alert("Login!")
            throw redirect(303, "/admin/login")
        } else if (sessionId && (pathname.endsWith("/login") || pathname.endsWith("/admin"))) {
            throw redirect(303, "/admin/dashboard")
        }
    }

    return resolve(event)
}