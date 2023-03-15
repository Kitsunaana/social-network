import { session } from "./util.js"

const signoutButton = document.querySelector('[data-action="signout"]')

main()

async function main () {
    const user = await session()

    if (user) {
        signoutButton.classList.remove('d-none')
        signoutButton.addEventListener('click', signout)
    } else {
        signoutButton.classList.add('d-none')
    }
}

// POST /api/signout
async function signout () {
    try {
        const response = await fetch('/api/signout', { method: "POST" })

    } catch (error) {
        console.log(error)
    } finally {
        location.reload()
    }
}