import { dev } from '$app/environment';
import { login } from '@applayer'

export const actions = {
    login: async ( { request, cookies } ) => {
        const { username, password } = Object.fromEntries((await request.formData()).entries())
        const result = await login(username, password);
        if (result) {
            cookies.set('session_id', result.id, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: !dev,
                maxAge: 60 * 60 * 24
            })
            return { success: true, message: "Logged in succeed!" }
        }
        return { success: false, message: "Logged in failed!"}
    }
} 