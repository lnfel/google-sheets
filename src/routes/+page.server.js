import { resolve } from 'path'
import { fail } from '@sveltejs/kit'
import { luciaAuth } from '$lib/lucia/index.js'
import { prisma } from '$lib/prisma/index.js'
import { google, Auth } from 'googleapis'
import { GOOGLE_API_KEY } from '$env/static/private'

export const load = async ({ locals }) => {
    // const session = await locals.luciaAuthRequest.validate()
    // console.log('[session]: ', session)
    const users = await prisma.user.findMany()

    const googleAuth = new Auth.GoogleAuth({
        keyFile: resolve('google_sheets_service_account_keys.json'),
        scopes: [
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/spreadsheets'
        ]
    })

    const sheets = google.sheets({
        version: 'v4',
        auth: googleAuth
    })
    /**
     * https://developers.google.com/sheets/api/reference/rest
     */
    // const response = await sheets.spreadsheets.create()
    // const spreadsheet = response.data
    // console.log(spreadsheet)

    // const response = await sheets.spreadsheets.get({
    //     spreadsheetId: '1gk0IQjjAdCAbEBtrgeqdeAV5An0grFlFaO92kXAVCeM'
    // })
    // const spreadsheet = response.data
    // console.log(spreadsheet)
    // console.log(response)

    const getHeadersResponse = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: '1gk0IQjjAdCAbEBtrgeqdeAV5An0grFlFaO92kXAVCeM',
        ranges: ['users!1:1']
    })
    const headersData = getHeadersResponse.data
    const spreadsheetHeaders = headersData.valueRanges?.[0].values?.[0]

    const getUsersResponse = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: '1gk0IQjjAdCAbEBtrgeqdeAV5An0grFlFaO92kXAVCeM',
        ranges: ['users!2:50']
    })
    const usersData = getUsersResponse.data
    const spreadSheetUsers = usersData.valueRanges?.[0]?.values ?? []

    return {
        users,
        spreadsheetHeaders,
        spreadSheetUsers
    }
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
