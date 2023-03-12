import { isEmail, session } from "../util.js";

const igroupEmail = document.querySelector('[data-igroup="email"]');
const igroupName = document.querySelector('[data-igroup="name"]');
const igroupSurname = document.querySelector('[data-igroup="surname"]');
const igroupPassword = document.querySelector('[data-igroup="password"]');
const igroupConfirm = document.querySelector('[data-igroup="confirm"]');
const regButton = document.querySelector('[data-action="reg"]');

main();

async function main() {
	const user = await session();

	if (user) {
		return (location.href = "/profile.html");
	}

	regButton.addEventListener("click", validate);
}

function validate() {
	let flag = true;

	// Валидация имени
	const nameFormFloating = igroupName.querySelector(".form-floating");
	const nameInput = igroupName.querySelector("input");
	const name = nameInput.value.trim();

	nameFormFloating.classList.remove("is-valid", "is-invalid");
	nameInput.classList.remove("is-valid", "is-invalid");

	if (!name) {
		flag = false;

		nameFormFloating.classList.add("is-invalid");
		nameInput.classList.add("is-invalid");
	} else {
		nameFormFloating.classList.add("is-valid");
		nameInput.classList.add("is-valid");
	}
	// Валидация имени

	// Валидация фамилии
	const surnameFormFloating = igroupSurname.querySelector(".form-floating");
	const surnameInput = igroupSurname.querySelector("input");
	const surname = surnameInput.value.trim();

	surnameFormFloating.classList.remove("is-valid", "is-invalid");
	surnameInput.classList.remove("is-valid", "is-invalid");

	if (!surname) {
		flag = false;

		surnameFormFloating.classList.add("is-invalid");
		surnameInput.classList.add("is-invalid");
	} else {
		surnameFormFloating.classList.add("is-valid");
		surnameInput.classList.add("is-valid");
	}
	// Валидация фамилии

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

	// Валидация подтверждения
	const confirmFormFloating = igroupConfirm.querySelector(".form-floating");
	const confirmInput = igroupConfirm.querySelector("input");
	const confirmPassword = confirmInput.value;

	confirmFormFloating.classList.remove("is-valid", "is-invalid");
	confirmInput.classList.remove("is-valid", "is-invalid");

	if (password !== confirmPassword || !confirmPassword) {
		flag = false;

		confirmFormFloating.classList.add("is-invalid");
		confirmInput.classList.add("is-invalid");
	} else {
		confirmFormFloating.classList.add("is-valid");
		confirmInput.classList.add("is-valid");
	}
	// Валидация подтверждения

	if (flag) {
		registration();
	}
}

// POST /api/reg
async function registration() {
	// Сброс классов группы имени
	const nameFormFloating = igroupName.querySelector(".form-floating");
	const nameInput = igroupName.querySelector("input");
	const name = nameInput.value.trim();

	nameFormFloating.classList.remove("is-valid", "is-invalid");
	nameInput.classList.remove("is-valid", "is-invalid");
	// Сброс классов группы имени

	// Сброс классов группы фамилии
	const surnameFormFloating = igroupSurname.querySelector(".form-floating");
	const surnameInput = igroupSurname.querySelector("input");
	const surname = surnameInput.value.trim();

	surnameFormFloating.classList.remove("is-valid", "is-invalid");
	surnameInput.classList.remove("is-valid", "is-invalid");
	// Сброс классов группы фамилии

	// Сброс классов группы почты
	const emailFormFloating = igroupEmail.querySelector(".form-floating");
	const emailInput = igroupEmail.querySelector("input");
	const email = emailInput.value.trim();

	emailFormFloating.classList.remove("is-valid", "is-invalid");
	emailInput.classList.remove("is-valid", "is-invalid");
	// Сброс классов группы почты

	// Сброс классов группы пароля
	const passwordFormFloating = igroupPassword.querySelector(".form-floating");
	const passwordInput = igroupPassword.querySelector("input");
	const password = passwordInput.value;

	passwordInput.value = "";
	passwordFormFloating.classList.remove("is-valid", "is-invalid");
	passwordInput.classList.remove("is-valid", "is-invalid");
	// Сброс классов группы пароля

	// Сброс классов группы подтверждения
	const confirmFormFloating = igroupConfirm.querySelector(".form-floating");
	const confirmInput = igroupConfirm.querySelector("input");

	confirmInput.value = "";
	confirmFormFloating.classList.remove("is-valid", "is-invalid");
	confirmInput.classList.remove("is-valid", "is-invalid");
	// Сброс классов группы подтверждения

	try {
		const response = await fetch("http://localhost:8081/api/reg", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password, name, surname }),
		});

		if (response.ok) {
			alert("Регистрация прошла успешно");
			location.href = "/index.html";
			return;
		}

		const text = await response.text();
		throw Error(text);
	} catch (error) {
		console.error(error);
		alert(error.message);
	}
}
