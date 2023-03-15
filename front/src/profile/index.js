import { getProfile, session } from '../util.js'
import '../initExit.js'
import "../initMenu.js"

const fieldAvatarImg = document.querySelector('[data-field="avatar"]')
const fieldStatusSmall = document.querySelector('[data-field="status"]')
const fieldNameDiv = document.querySelector('[data-field="name"]')
const addFriendButton = document.querySelector('[data-action="addFriend"]')
const removeRequestButton = document.querySelector('[data-action="removeRequest"]')
const removeFriendButton = document.querySelector('[data-action="removeFriend"]')
const startChatButton = document.querySelector('[data-action="startChat"]')
const fieldPostTextarea = document.querySelector('[data-field="postEditor"]')
const sendPostButton = document.querySelector('[data-action="sendPost"]')

let user = null
let profile = null

main()

async function main () {
    user = await session()

    const searchParams = new URLSearchParams(location.search)
    if (searchParams.has("userId")) {
        const userId = parseInt(searchParams.get('userId'), 10)
        profile = await getProfile(userId)
    } else if (user) {
        profile = await getProfile(user?.id)
    } else {
        return (location.href = '/')
    }

    fieldAvatarImg.src = profile.user.img
    fieldStatusSmall.textContent = profile.user.status
    fieldNameDiv.textContent = `${profile.user.name} ${profile.user.surname}`
    document.querySelector('title').textContent = `${profile.user.name} ${profile.user.surname}`

    addFriendButton.classList.add('d-none')
    removeFriendButton.classList.add('d-none')
    removeRequestButton.classList.add('d-none')
    startChatButton.classList.add('d-none')

    if (profile.friend) {
        removeFriendButton.classList.remove('d-none')
        startChatButton.classList.remove('d-none')
        removeFriendButton.addEventListener('click', removeFriend)
        startChatButton.addEventListener('click', () => location.href = `/chat.html?userId=${profile.user.id}`)
    } else if (profile.request) {
        removeRequestButton.classList.remove('d-none')
        removeRequestButton.addEventListener('click', removeRequest)
    } else if (user && user.id !== profile.user.id) {
        addFriendButton.classList.remove('d-none')
        addFriendButton.addEventListener('click', addFriend)
    }

    fieldPostTextarea.disabled = true
    sendPostButton.disabled = true
    fieldPostTextarea.value = 'На стене могут писать только друзья'

    if ((user && user.id === profile.user.id) || (profile.friend)) {
        fieldPostTextarea.disabled = false
        sendPostButton.disabled = false
        fieldPostTextarea.value = ''
    }
}

// POST /api/request/:userId
async function addFriend() {
	try {
		const response = await fetch(`/api/request/${profile.user.id}`, {
			method: "POST",
		})

		if (response.ok) {
			location.reload()
			return
		}

		const text = await response.text()
		throw Error(text)
	} catch (error) {
		console.error(error)
		alert(error.message)
	}
}

// POST /api/revoke/:userId
async function removeRequest() {
	try {
		const response = await fetch(`/api/revoke/${profile.user.id}`, {
			method: "POST",
		})

		if (response.ok) {
			location.reload()
			return
		}

		const text = await response.text()
		throw Error(text)
	} catch (error) {
		console.error(error)
		alert(error.message)
	}
}

// POST /api/revoke/:userId
async function removeFriend() {
	try {
		const response = await fetch(`/api/friend/${profile.user.id}`, {
			method: "DELETE",
		})

		if (response.ok) {
			location.reload()
			return
		}

		const text = await response.text()
		throw Error(text)
	} catch (error) {
		console.error(error)
		alert(error.message)
	}
}