<script>
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
</script>

<AppShell 
    regionPage="space-y-4"
    slotHeader="container mx-auto px-4 py-6 lg:px-8"
    slotPageHeader="container mx-auto px-4 lg:px-8"
    slotPageContent="container mx-auto px-4 lg:px-8"
    slotFooter="container mx-auto px-4 py-6 lg:px-8">
	<svelte:fragment slot="header">
        <h1 class="text-xl uppercase font-semibold tracking-wide">Sample App</h1>
    </svelte:fragment>
	<svelte:fragment slot="pageHeader">
        <h2 class="text-lg font-semibold tracking-wide">Register</h2>
    </svelte:fragment>
	<slot />
	<svelte:fragment slot="footer">
        <small>&copy; Sample App | All rights reserved.</small>
    </svelte:fragment>
</AppShell>
