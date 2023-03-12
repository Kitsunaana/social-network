import "../initExit.js"

const userslistDiv = document.querySelector('[data-segment="userslist"]');

main();

// GET /api/users
async function main() {
	try {
		const response = await fetch("http://localhost:8081/api/users", { method: "GET" });

		if (response.ok) {
			const users = await response.json();
			initUsersList(users);
			return;
		}

		const text = await response.text();
		throw Error(text);
	} catch (error) {
		console.error(error);
	}
}

function initUsersList(users) {
	userslistDiv.innerHTML = "";
	userslistDiv.append(...users.map(createUserItem));
}

function createUserItem(user) {
	const a = document.createElement("a");
	a.className = "list-group-item list-group-item-action text-primary";
	a.textContent = `${user.name} ${user.surname}`;
	a.href = `/profile.html?userId=${user.id}`;
	return a;
}
