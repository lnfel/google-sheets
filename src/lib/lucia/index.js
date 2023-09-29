import { lucia } from "lucia"
import { sveltekit } from "lucia/middleware"
import { prisma as prismaAdapter } from "@lucia-auth/adapter-prisma"
import { prisma as prismaClient } from "$lib/prisma"

export const luciaAuth = lucia({
    env: "DEV",
    middleware: sveltekit(),
    sessionCookie: {
		expires: false
	},
    adapter: prismaAdapter(prismaClient),
    getUserAttributes: (data) => {
        return {
            name: data.name,
            surname: data.surname,
            email: data.email
        }
    }
})

/**
 * @typedef {typeof luciaAuth} Auth
 */
