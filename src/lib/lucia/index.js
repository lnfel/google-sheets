import { lucia } from "lucia"
import { web } from "lucia/middleware"
import { prisma as prismaAdapter } from "@lucia-auth/adapter-prisma"
import { prisma as prismaClient } from "$lib/prisma"

export const auth = lucia({
    env: "DEV",
    middleware: web(),
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
