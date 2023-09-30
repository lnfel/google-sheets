// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
            luciaAuthRequest: Lucia.AuthRequest
        }
		interface PageData {
            user: Lucia.User
            users: Lucia.User[]
            spreadsheetHeaders: string[]
            spreadSheetUsers: string[][]
        }
		// interface Platform {}
	}
    namespace Lucia {
        type Auth = import('$lib/lucia/index.js').Auth
        type AuthRequest = import('lucia').AuthRequest
        type DatabaseUserAttributes = {
            name: string
            surname: string
            email: string
        }
        type DatabaseSessionAttributes = {}
        type User = {
            name: string
            surname: string
            email: string
            userId: string
        }
    }
}

export {};
