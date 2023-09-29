import { luciaAuth } from '$lib/lucia'

/**
 * @type {import('@sveltejs/kit').Handle}
 * @returns {Promise<Response>}
 */
export const handle = async ({ event, resolve }) => {
    event.locals.luciaAuthRequest = luciaAuth.handleRequest(event)
    return await resolve(event)
}
