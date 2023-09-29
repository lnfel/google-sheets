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