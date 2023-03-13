import { isEmail, session } from "../util.js";

const igroupEmail = document.querySelector('[data-igroup="email"]');
const igroupPassword = document.querySelector('[data-igroup="password"]');
const enterButton = document.querySelector('[data-action="enter"]');

main();

async function main() {
	const user = await session();

	if (user) {
		return (location.href = "/profile.html");
	}

	enterButton.addEventListener("click", validate);
}

function validate() {
	let flag = true;

	// Валидация почты
	const emailFormFloating = igroupEmail.querySelector(".form-floating");
	const emailInput = igroupEmail.querySelector("input");
	const email = emailInput.value.trim();

	emailFormFloating.classList.remove("is-valid", "is-invalid");
	emailInput.classList.remove("is-valid", "is-invalid");

	if (!isEmail(email)) {
		flag = false;

		emailFormFloating.classList.add("is-invalid");
		emailInput.classList.add("is-invalid");
	} else {
		emailFormFloating.classList.add("is-valid");
		emailInput.classList.add("is-valid");
	}
	// Валидация почты

	// Валидация пароля
	const passwordFormFloating = igroupPassword.querySelector(".form-floating");
	const passwordInput = igroupPassword.querySelector("input");
	const password = passwordInput.value;

	passwordFormFloating.classList.remove("is-valid", "is-invalid");
	passwordInput.classList.remove("is-valid", "is-invalid");

	if (password.length < 3) {
		flag = false;

		passwordFormFloating.classList.add("is-invalid");
		passwordInput.classList.add("is-invalid");
	} else {
		passwordFormFloating.classList.add("is-valid");
		passwordInput.classList.add("is-valid");
	}
	// Валидация пароля

	if (flag) {
		enter();
	}
}

// POST /api/signin
async function enter() {
	// Сброс почты
	const emailFormFloating = igroupEmail.querySelector(".form-floating");
	const emailInput = igroupEmail.querySelector("input");
	const email = emailInput.value.trim();

	emailFormFloating.classList.remove("is-valid", "is-invalid");
	emailInput.classList.remove("is-valid", "is-invalid");
	// Сброс почты

	// Сброс пароля
	const passwordFormFloating = igroupPassword.querySelector(".form-floating");
	const passwordInput = igroupPassword.querySelector("input");
	const password = passwordInput.value;

	passwordInput.value = "";
	passwordFormFloating.classList.remove("is-valid", "is-invalid");
	passwordInput.classList.remove("is-valid", "is-invalid");
	// Сброс пароля

	const data = new FormData();
	data.append("email", email);
	data.append("password", password);

	try {
		const response = await fetch("/api/signin", {
			method: "POST",
			body: data,
		});

		if (response.ok) {
			location.href = "/profile.html";
			return;
		}

		const text = await response.text();
		throw Error(text);
	} catch (error) {
		console.error(error);
		alert(error.message);
	}
}
