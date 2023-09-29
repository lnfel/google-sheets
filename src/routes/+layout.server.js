
export const load = async ({ locals }) => {
    const session = await locals.luciaAuthRequest.validate()
    console.log('[session]: ', session)

    return {
        user: session?.user
    }
}
