import { session, getProfile } from "./util.js"

const menuDiv = document.querySelector('[data-segment="menu"]')

main()

async function main () {
    if (!menuDiv) return

    const user = await session()

    if (user) {
        menuDiv.classList.remove('invisible')
    } else {
        menuDiv.classList.add('invisible')
    }

    const { pathname } = location
    let activeMenuItemTag = null

    if (pathname === "/profile.html") {
        const searchParams = new URLSearchParams(location.search)

        if (searchParams.has("userId")) {
            const userId = parseInt(searchParams.get("userId"), 10)
            const profile = await getProfile(userId)

            if (profile.user.id === user.id) {
                activeMenuItemTag = 'profile'
            }

        } else {
            activeMenuItemTag = 'profile'
        }
        
    }

    else if (pathname === "/friends.html") activeMenuItemTag = 'friends'
    else if (pathname === "/chat.html") activeMenuItemTag = 'chat'
    else if (pathname === "/settings.html") activeMenuItemTag = 'settings'

    const menuItems = document.querySelectorAll('[data-menuitem]')
    for (const menuItem of menuItems) menuItem.classList.remove('active')

    const menuItem = document.querySelector(`[data-menuitem="${activeMenuItemTag}"]`)
    
    if (menuItem) menuItem.classList.add('active')
}