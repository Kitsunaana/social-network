const emailRegex =
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export function isEmail(str) {
	return emailRegex.test(str);
}

// GET /api/session
export async function session(unauthenticatedCallback = () => {}) {
	try {
		const response = await fetch("/api/session");

		if (response.ok) {
			const data = await response.json();
			return data;
		}

		unauthenticatedCallback();
	} catch (error) {
		console.error(error);
	}
}

// GET /api/user/userId
export async function getProfile (userId) {
	try {
		const response = await fetch(`/api/user/${userId}`);

		if (response.ok) {
			const user = await response.json();
			console.log(user);
			return user;
		}

		return null
	} catch (error) {
		console.error(error);
		return null
	}
}