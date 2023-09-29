<script>
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';
	import { afterNavigate } from '$app/navigation'
	import '../app.css';

	import { AppShell } from '@skeletonlabs/skeleton'

	afterNavigate((params) => {
		const isNewPage = params.from && params.to && params.from.route.id !== params.to.route.id
		const elemPage = document.querySelector('#page')
		if (isNewPage && elemPage !== null) {
			elemPage.scrollTop = 0
		}
	});

    /** @type {import('@sveltejs/kit').SubmitFunction} */
    async function logoutHandler({  }) {
        return async ({ update }) => {
            await update()
        }
    }
</script>

<AppShell 
    regionPage="space-y-4"
    slotHeader="container mx-auto flex items-center justify-between px-4 py-6 lg:px-8"
    slotPageHeader="container mx-auto px-4 lg:px-8"
    slotPageContent="container mx-auto px-4 lg:px-8"
    slotFooter="container mx-auto px-4 py-6 lg:px-8">
	<svelte:fragment slot="header">
        <h1 class="text-xl uppercase font-semibold tracking-wide">Sample App</h1>
        <nav>
            {#if $page.data?.user}
                <div class="relative">
                    <button type="button" class="btn variant-ghost-tertiary rounded-lg px-4 py-1.5">
                        { $page.data?.user.name }
                    </button>

                    <div class="absolute top-full right-0 mt-1">
                        <form use:enhance={logoutHandler} method="post" action="?/logout">
                            <button type="submit" class="btn btn-sm variant-filled-tertiary rounded-lg px-4 py-1.5">Logout</button>
                        </form>
                    </div>
                </div>
            {:else}
                <a href="/login" class="btn variant-filled-tertiary rounded-lg">Login</a>
            {/if}
        </nav>
    </svelte:fragment>
	<svelte:fragment slot="pageHeader">
        <h2 class="text-lg font-semibold tracking-wide">Register</h2>
    </svelte:fragment>
	<slot />
	<svelte:fragment slot="footer">
        <small>&copy; Sample App | All rights reserved.</small>
    </svelte:fragment>
</AppShell>
