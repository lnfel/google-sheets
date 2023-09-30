import { fail } from '@sveltejs/kit'
import { luciaAuth } from '$lib/lucia/index.js'

export const load = async ({ locals }) => {
    // const session = await locals.luciaAuthRequest.validate()
    // console.log('[session]: ', session)
}

export const actions = {
    register: async ({ request, locals }) => {
        const formData = await request.formData()
        const name = formData.get('name')
        const surname = formData.get('surname')
        const email = formData.get('email')
        const password = formData.get('password')
        for(const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`)
            if (!value || value.length === 0) return fail(400, {
                errors: {
                    [key]: `${key.at(0)?.toUpperCase()}${key.slice(1)} is required.`
                },
                name,
                surname,
                email
            });
        }

        try {
            const user = await luciaAuth.createUser({
                key: {
                    providerId: 'email',
                    providerUserId: typeof email === 'string' ? email.toLowerCase() : '',
                    password: typeof password === 'string' ? password : ''
                },
                attributes: {
                    name: typeof name === 'string' ? name : '',
                    surname: typeof surname === 'string' ? surname : '',
                    email: typeof email === 'string' ? email : ''
                }
            })

            const session = await luciaAuth.createSession({
                userId: user.userId,
                attributes: {}
            })

            locals.luciaAuthRequest.setSession(session)
        } catch (error) {
            console.log('[register] error: ', error)
        }
    },
    login: async ({ request, locals }) => {
        const formData = await request.formData()
        const email = formData.get('email')
        const password = formData.get('password')

        try {
            const key = await luciaAuth.useKey(
                "email",
                typeof email === 'string' ? email.toLowerCase() : '',
                typeof password === 'string' ? password : ''
            )
            const session = await luciaAuth.createSession({
                userId: key.userId,
                attributes: {}
            })
            locals.luciaAuthRequest.setSession(session)
        } catch (error) {
            console.log('[login] error: ', error)
        }
    },
    logout: async ({ locals }) => {
        const session = await locals.luciaAuthRequest.validate()
        if (!session) return fail(401)
        await luciaAuth.invalidateSession(session.sessionId)
        locals.luciaAuthRequest.setSession(null)
        // throw redirect(302, "/login")
    }
}
