<script>
    import { page } from "$app/stores"
    import { enhance } from "$app/forms"

    // const form = {
    //     name: 'Pekora',
    //     surname: 'Usada',
    //     email: 'pekopeko@hololive.jp',
    //     password: 'pekopekopekopeko'
    // }

    const form = {
        name: '',
        surname: '',
        email: '',
        password: ''
    }

    /** @type {import('@sveltejs/kit').SubmitFunction} */
    async function submitHandlerNoReset({ formData }) {
        for(const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`)
        }
        return async ({ update }) => {
            console.log($page)
            await update({ reset: false })
        }
    }
</script>

<main>
    <section>
        <form use:enhance={submitHandlerNoReset} method="post" action="?/register" class="space-y-4">
            <div class="flex flex-wrap gap-4">
                <label class="label max-w-fit">
                    <div>Name</div>
                    <input bind:value={form.name} name="name" class="input max-w-fit rounded-lg {$page.form?.errors?.name ? 'border-rose-500' : ''}" title="Input (name)" type="text" placeholder="Pekora" autocomplete="given-name" />
                    <div class="text-sm text-rose-500 {$page.form?.errors?.name ? '' : 'hidden'}">{ $page.form?.errors?.name }</div>
                </label>

                <label class="label max-w-fit">
                    <div>Surname</div>
                    <input bind:value={form.surname} name="surname" class="input max-w-fit rounded-lg {$page.form?.errors?.surname ? 'border-rose-500' : ''}" title="Input (surname)" type="text" placeholder="Usada" autocomplete="family-name" />
                    <div class="text-sm text-rose-500 {$page.form?.errors?.surname ? '' : 'hidden'}">{ $page.form?.errors?.surname }</div>
                </label>
            </div>
            <div class="flex flex-wrap gap-4">
                <label class="label max-w-fit">
                    <div>Email</div>
                    <input bind:value={form.email} name="email" class="input max-w-fit rounded-lg {$page.form?.errors?.email ? 'border-rose-500' : ''}" title="Input (email)" type="email" placeholder="pekopeko@hololive.jp" autocomplete="email" />
                    <div class="text-sm text-rose-500 {$page.form?.errors?.email ? '' : 'hidden'}">{ $page.form?.errors?.email }</div>
                </label>
        
                <label class="label max-w-fit">
                    <div>Password</div>
                    <input bind:value={form.password} name="password" class="input max-w-fit rounded-lg {$page.form?.errors?.password ? 'border-rose-500' : ''}" title="Input (password)" type="password" placeholder="Very strong password" />
                    <div class="text-sm text-rose-500 {$page.form?.errors?.password ? '' : 'hidden'}">{ $page.form?.errors?.password }</div>
                </label>
            </div>

            <button type="submit" class="btn variant-filled-tertiary rounded-lg px-4 py-1.5">Sign me up!</button>
        </form>
    </section>
</main>
