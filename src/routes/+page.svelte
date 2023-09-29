<script>
    import { enhance } from "$app/forms"

    const form = {
        name: 'Pekora',
        surname: 'Usada',
        email: 'pekopeko@hololive.jp',
        password: 'pekopekopekopeko'
    }

    /** @type {import('@sveltejs/kit').SubmitFunction} */
    async function submitHandlerNoReset({ formData }) {
        for(const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`)
        }
        return async ({ update }) => {
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
                    <input bind:value={form.name} name="name" class="input max-w-fit rounded-lg" title="Input (name)" type="text" placeholder="Pekora" autocomplete="given-name" />
                </label>

                <label class="label max-w-fit">
                    <div>Surname</div>
                    <input bind:value={form.surname} name="surname" class="input max-w-fit rounded-lg" title="Input (surname)" type="text" placeholder="Usada" autocomplete="family-name" />
                </label>
            </div>
            <div class="flex flex-wrap gap-4">
                <label class="label max-w-fit">
                    <div>Email</div>
                    <input bind:value={form.email} name="email" class="input max-w-fit rounded-lg" title="Input (email)" type="email" placeholder="pekopeko@hololive.jp" autocomplete="email" />
                </label>
        
                <label class="label max-w-fit">
                    <div>Password</div>
                    <input bind:value={form.password} name="password" class="input max-w-fit rounded-lg" title="Input (password)" type="password" placeholder="Very strong password" />
                </label>
            </div>

            <button type="submit" class="btn variant-filled-primary rounded-lg">Sign me up!</button>
        </form>
    </section>
</main>
