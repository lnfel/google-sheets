export const load = async ({ locals }) => {
    const session = await locals.luciaAuthRequest.validate()
    console.log('[session]: ', session)
    if (session) {
        locals.luciaAuthRequest.setSession(session)
    }
}

/**
 * @type {import("@sveltejs/kit").Actions}
 */
export const actions = {
    register: async ({ request, locals }) => {
        const formData = await request.formData()
        for(const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`)
        }
    }
}
