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

<AppShell>
	<svelte:fragment slot="header">Header</svelte:fragment>
	<svelte:fragment slot="pageHeader">Page Header</svelte:fragment>
	<slot />
	<svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>
